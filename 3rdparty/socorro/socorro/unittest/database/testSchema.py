import datetime as dt
import errno
import logging
import os
import time

from nose.tools import *
import psycopg2

import socorro.lib.ConfigurationManager as configurationManager
import socorro.database.schema as schema
import socorro.database.postgresql as socorro_psg

from socorro.unittest.testlib.testDB import TestDB

import dbTestconfig as testConfig

class Me:
  pass
me = None

def setup_module():
  global me
  if me:
    return
  me = Me()
  me.config = configurationManager.newConfiguration(configurationModule = testConfig, applicationName='Testing Postgresql Utils')
  myDir = os.path.split(__file__)[0]
  if not myDir: myDir = '.'
  replDict = {'testDir':'%s'%myDir}
  for i in me.config:
    try:
      me.config[i] = me.config.get(i)%(replDict)
    except:
      pass
  me.logFilePathname = me.config.logFilePathname
  if not me.logFilePathname:
    me.logFilePathname = 'logs/db_test.log'
  logFileDir = os.path.split(me.logFilePathname)[0]
  try:
    os.makedirs(logFileDir)
  except OSError,x:
    if errno.EEXIST == x.errno: pass
    else: raise
  f = open(me.logFilePathname,'w')
  f.close()
  fileLog = logging.FileHandler(me.logFilePathname, 'a')
  fileLog.setLevel(logging.DEBUG)
  fileLogFormatter = logging.Formatter('%(asctime)s %(levelname)s - %(message)s')
  fileLog.setFormatter(fileLogFormatter)
  me.logger = logging.getLogger("db_test")
  me.logger.addHandler(fileLog)
  me.logger.setLevel(logging.DEBUG)
  me.dsn = "host=%s dbname=%s user=%s password=%s" % (me.config.databaseHost,me.config.databaseName,
                                                      me.config.databaseUserName,me.config.databasePassword)
  me.testDB = TestDB()
  me.expectedTableNames = set(['tcbyurlconfig', 'topcrashurlfacts', 'priorityjobs', 'branches', 'processors', 'productdims', 'topcrashurlfactsreports', 'urldims', 'mtbfconfig', 'signaturedims', 'reports', 'server_status', 'dumps', 'extensions', 'mtbffacts', 'frames', 'topcrashers', 'jobs',])
  me.expectedTableDependencies = {
    'topcrashurlfactsreports': set(['productdims', 'signaturedims', 'urldims', 'topcrashurlfacts', 'topcrashurlfactsreports']),
    'signaturedims': set(['signaturedims']),
    'jobs': set(['processors', 'jobs']),
    'processors': set(['processors']),
    'mtbfconfig': set(['productdims', 'mtbfconfig']),
    'urldims': set(['urldims']),
    'productdims': set(['productdims']),
    'topcrashurlfacts': set(['productdims', 'signaturedims', 'urldims', 'topcrashurlfacts']),
    'reports': set(['reports']),
    'server_status': set(['server_status']),
    'dumps': set(['dumps']),
    'tcbyurlconfig': set(['productdims', 'tcbyurlconfig']),
    'priorityjobs': set(['priorityjobs']),
    'mtbffacts': set(['productdims', 'mtbffacts']),
    'topcrashers': set(['topcrashers']),
    'frames': set(['frames']),
    'branches': set(['branches']),
    'extensions': set(['extensions']),
    }

def teardown_module():
  me.testDB.removeDB(me.config,me.logger)

def testMondayPairsIteratorFactory():
  """testMondayPairsIteratorFactory():
    - check that we get the Monday-to-Monday full week from one non-Monday
    - check that we get the appropriate weeks for a pair of Mondays
    - check that we get appropriate weeks for a leading Monday, trailing non-Monday
    - check that we raise ValueError for reverse-order arguments
    - check that we raise TypeError for non-date arguments
  """
  data = [
    (dt.date(2008,1,1),dt.date(2008,1,1),[(dt.date(2007, 12, 31), dt.date(2008, 1, 7))]),
    (dt.date(2008,1,7),dt.date(2008,1,19),[(dt.date(2008, 1, 7), dt.date(2008, 1, 14)), (dt.date(2008, 1, 14), dt.date(2008, 1, 21))]),
    (dt.date(2008,1,9),dt.date(2008,2,3),[(dt.date(2008, 1, 7), dt.date(2008, 1, 14)), (dt.date(2008, 1, 14), dt.date(2008, 1, 21)), (dt.date(2008, 1, 21), dt.date(2008, 1, 28)), (dt.date(2008, 1, 28), dt.date(2008, 2, 4))]),
    (dt.date(2008,1,7),dt.date(2008,1,1),ValueError),
    ("bad",dt.date(2008,1,1),TypeError),
    (dt.date(2008,1,1),"bad",TypeError),
    (39,"worse",TypeError),
    ]
  for datePair in data:
    expected = datePair[-1]
    if isinstance(expected,list):
      di = schema.mondayPairsIteratorFactory(*(datePair[:2]))
      got = [ x for x in di ]
      assert datePair[-1]  == got , 'Expected %s, got %s'%(datePair[-1],got)
    else:
      assert_raises(expected,schema.mondayPairsIteratorFactory,*(datePair[:2]))

def testGetOrderedSetupList():
  """ testGetOrderedSetupList()
   - check that the full list is what we expect
   - check that each table has expected dependencies
   - check that (maybe buggy) non-existent table has only self as dependency
  """
  global me
  lookup = {}
  allTables = schema.getOrderedSetupList()
  for t in allTables:
    try:
      n = t(logger=me.logger).name
      lookup[t] = n
    except:
      lookup[t] = t
  gotTableNames = set(lookup.values())
  assert me.expectedTableNames == gotTableNames, "Expected:\n  %s\nGot:\n  %s"%(me.expectedTableNames,gotTableNames)

  gotDependencies = {}
  for t in allTables:
    gotDependencies[lookup[t]] = set([lookup[x] for x in schema.getOrderedSetupList((t,))])
  assert me.expectedTableDependencies == gotDependencies, "Expected:\n  %s\nGot\n  %s"%(expectedDependencies,gotDependencies)
  assert ['woohoo'] == schema.getOrderedSetupList(['woohoo'])

def testGetOrderedPartitionList():
  """
  testGetOrderedPartitionList():
   - check that the full list is what we expect
   - check that each table has expected dependencies
  """
  global me
  lookup = {}
  expected = {
    'frames': set(['frames', 'reports']),
    'extensions': set(['extensions', 'reports']),
    'dumps': set(['dumps', 'reports']),
    }
  allTables = schema.getOrderedSetupList()
  for t in allTables:
    n = t(logger=me.logger).name
    lookup[t] = n
  allTables = schema.getOrderedSetupList()
  for t in allTables:
    tableName = lookup[t]
    gotValue = set([lookup[x] for x in schema.getOrderedPartitionList([t])])
    if tableName in expected:
      assert expected[tableName] == gotValue, 'Expected %s, got %s'%(expected[tableName],gotValue)
    else:
      assert set([tableName]) == gotValue, 'Expected %s, got %s'%(set([tableName]),gotValue)
  
def testTwoPartitionCreatedFunctions():
  """
  testTwoPartitionCreatedFunctions():
   - check that we start empty, that an added one is seen and that a non-added one is not seen
  """
  assert set() == schema.partitionCreationHistory
  assert not schema.partitionWasCreated('woo')
  schema.markPartitionCreated('woo')
  assert set(['woo']) == schema.partitionCreationHistory
  assert schema.partitionWasCreated('woo')
  assert not schema.partitionWasCreated('foo')
  
def testConnectToDatabase():
  """
  testConnectToDatabase():
   - check that we can connect to the database and do something with the connection and cursor provided
  """
  global me
  tcon,tcur = schema.connectToDatabase(me.config,me.logger)
  connection = psycopg2.connect(me.dsn)
  cursor = connection.cursor()
  cursor.execute("DROP TABLE IF EXISTS foo")
  connection.commit()
  try:
    cursor.execute("CREATE TABLE foo (id integer)")
    connection.commit()
    cursor.execute("SELECT * from foo")
    connection.commit()
    assert [] == cursor.fetchall()
    tcur.execute("INSERT INTO foo (id) values(%s)",(666,))
    tcon.commit()
    cursor.execute("SELECT * from foo")
    assert 666 == cursor.fetchone()[0]
  finally:
    cursor.execute("DROP TABLE IF EXISTS foo")
    connection.commit()
    connection.close()
  
def testSetupAndTeardownDatabase():
  """
  testSetupAndTeardownDatabase():
   - test that when we setupDatabase, we get all the expected tables
   - test that when we teardownDatabase, we remove all the expected tables
  """
  global me
  tcon,tcur = schema.connectToDatabase(me.config,me.logger)
  tcur.execute("DROP TABLE IF EXISTS %s CASCADE"%','.join(me.expectedTableNames))
  tcon.commit()
  try:
    schema.setupDatabase(me.config,me.logger)
    try:
      for t in me.expectedTableNames:
        # next line raises if the table does not exist
        tcur.execute("SELECT count(*) from %s"%t)
        tcon.commit()
        count = tcur.fetchone()[0]
        assert 0 == count
    finally:
      schema.teardownDatabase(me.config,me.logger)
    for t in me.expectedTableNames:
      try:
        tcur.execute("SELECT count(*) from %s"%t)
        assert False, 'Expected table %s does not exist'%t
      except psycopg2.ProgrammingError:
        tcon.rollback()
      except Exception,x:
        assert False, 'Expected psycopg2.ProgrammingError, not %s: %s'%(type(x),x)
  finally:
    tcon.close()
    
updated = []
def testUpdateDatabase():
  """
  testUpdateDatabase():
   - check that we fire (only) the appropriate updateDefinition methods. Not much else is possible
  """
  global me, updated
  updated = []
  expected = set(['reports','dumps','extensions','frames','processors','jobs'])
  found = set([ x(logger=me.logger).name for x in schema.databaseObjectClassListForUpdate])
  assert expected == found
  class ReportsStub(schema.ReportsTable):
    def __init__(self, logger, **kwargs):
      super(ReportsStub,self).__init__(logger,**kwargs)
    def updateDefinition(self,cursor):
      updated.append(self.name)
  class DumpsStub(schema.DumpsTable):
    def __init__(self, logger, **kwargs):
      super(DumpsStub,self).__init__(logger,**kwargs)
    def updateDefinition(self,cursor):
      updated.append(self.name)
  schema.databaseObjectClassListForUpdate = []
  schema.updateDatabase(me.config,me.logger)
  assert [] == updated
  schema.databaseObjectClassListForUpdate = [ReportsStub]
  schema.updateDatabase(me.config,me.logger)
  assert ['reports'] == updated

def testModuleCreatePartitions():
  """
  testModuleCreatePartitions():
  """
  global me
  connection = psycopg2.connect(me.dsn)
  try:
    cursor = connection.cursor()
    me.testDB.removeDB(me.config,me.logger)
    me.testDB.createDB(me.config,me.logger)
    me.config.startDate = dt.date(2008,1,1)
    me.config.endDate = dt.date(2008,1,1)
    reportSet = set(socorro_psg.tablesMatchingPattern('reports%',cursor))
    extensionSet = set(socorro_psg.tablesMatchingPattern('extensions%',cursor))
    frameSet0 = set(socorro_psg.tablesMatchingPattern('frames%',cursor))
    schema.databaseObjectClassListForWeeklyPartitions = [schema.ExtensionsTable]
    schema.createPartitions(me.config,me.logger)
    moreReportSet = set(socorro_psg.tablesMatchingPattern('report%',cursor))-reportSet
    moreExtensionSet = set(socorro_psg.tablesMatchingPattern('extensions%',cursor))-extensionSet
    assert set(['reports_20071231']) == moreReportSet
    assert set(['extensions_20071231']) == moreExtensionSet
    frameSet = set(socorro_psg.tablesMatchingPattern('frames%',cursor))
    assert frameSet0 == frameSet
    schema.databaseObjectClassListForWeeklyPartitions = [schema.FramesTable]
    schema.createPartitions(me.config,me.logger)
    moreFrameSet = set(socorro_psg.tablesMatchingPattern('frames%',cursor))-frameSet
    assert set(['frames_20071231']) == moreFrameSet
  finally:
    connection.close()

class TestDatabaseObject:
  def setUp(self):
    self.connection = psycopg2.connect(me.dsn)
  def tearDown(self):
    self.connection.close()
    
  def testConstructor(self):
    """
    TestDatabaseObject.testConstructor(self):
     - check that default constructor works as expected
     - check that constructor arguments are handled
    """
    dbo = schema.DatabaseObject()
    assert None == dbo.name
    assert None == dbo.creationSql
    assert None == dbo.logger
    dbo = schema.DatabaseObject("name","aLogger","--nothing here",blather='skyte')
    # and note that arbitrary kwarg is accepted. Don't check for ignored
    assert 'name' == dbo.name
    assert 'aLogger' == dbo.logger
    assert '--nothing here' == dbo.creationSql
  def testCreate(self):
    """
    TestDatabaseObject.testCreate():
     - check that we can create a table that inherits schema.DatabaseObject
     - check that if we try to create it again, the call succeeds without disturbing the database
    """
    class Foo(schema.DatabaseObject):
      def __init__(self):
        super(Foo,self).__init__(name='foo',logger=me.logger,creationSql='CREATE TABLE foo (name varchar)')
      def additionalCreationProcedures(self,cursor):
        cursor.execute("insert into foo values(%s)",(self.name,))
    cursor = self.connection.cursor()
    cursor.execute("DROP TABLE IF EXISTS foo CASCADE")
    self.connection.commit()
    try:
      assert_raises(psycopg2.ProgrammingError, cursor.execute, 'SELECT name from foo')
      self.connection.rollback()
      testFoo = Foo()
      testFoo.create(self.connection.cursor())
      self.connection.commit()
      cursor.execute('SELECT name from foo')
      assert 'foo' == cursor.fetchall()[0][0]
      self.connection.commit()
      testFoo.create(self.connection.cursor())
      self.connection.commit()
      cursor.execute('SELECT name from foo')
      assert 'foo' == cursor.fetchall()[0][0]
      self.connection.commit()
    finally:
      cursor.execute("DROP TABLE IF EXISTS foo CASCADE")
      self.connection.commit()

class TestTable:
  def setUp(self):
    self.connection = psycopg2.connect(me.dsn)
  def tearDown(self):
    self.connection.close()
    
  def testCreateAndDrop(self):
    """
    TestTable.testCreateAndDrop():
     - check that we can in fact (create then) drop a table that inherits schema.Table
    """
    class Foo(schema.Table):
      def __init__(self):
        super(Foo,self).__init__(name='foo',logger=me.logger,creationSql='CREATE TABLE foo (name varchar)')
        
    cursor = self.connection.cursor()
    cursor.execute("DROP TABLE IF EXISTS foo CASCADE")
    self.connection.commit()
    testFoo = Foo()
    try:
      assert_raises(psycopg2.ProgrammingError, cursor.execute, 'SELECT count(*)from foo')
      self.connection.rollback()
      testFoo = Foo()
      testFoo.create(self.connection.cursor())
      self.connection.commit()
      cursor.execute('SELECT count(*) from foo')
      assert 0 == cursor.fetchall()[0][0]
      testFoo.drop(cursor)
      self.connection.commit()
      assert_raises(psycopg2.ProgrammingError, cursor.execute, 'SELECT count(*)from foo')
      self.connection.rollback()
    finally:
      cursor.execute("DROP TABLE IF EXISTS foo CASCADE")
      self.connection.commit()

# During maintenance on schema.py: If you add, remove or rename any of the tables in schema, make a parallel change here
# value[0] is True iff the table is a PartitionedTable; value[1] is the expectedSet of table names (including precursors) for each Table
hardCodedSchemaClasses = {
  schema.BranchesTable:[False,set(['branches'])],
  schema.DumpsTable:[True,set(['dumps'])],
  schema.ExtensionsTable:[True,set(['extensions'])],
  schema.FramesTable:[True,set(['frames'])],
  schema.JobsTable:[False,set(['jobs', 'processors'])],
  schema.MTBFConfigTable:[False,set(['mtbfconfig', 'productdims'])],
  schema.MTBFFactsTable:[False,set(['mtbffacts', 'productdims'])],
  schema.PriorityJobsTable:[False,set(['priorityjobs'])],
  schema.ProcessorsTable:[False,set(['processors'])],
  schema.ProductDimsTable:[False,set(['productdims'])],
  schema.ReportsTable:[True,set(['reports'])],
  schema.ServerStatusTable:[False,set(['server_status'])],
  schema.SignatureDimsTable:[False,set(['signaturedims'])],
  schema.TCByUrlConfigTable:[False,set(['tcbyurlconfig', 'productdims'])],
  schema.TopCrashUrlFactsReportsTable:[False,set(['topcrashurlfactsreports', 'urldims', 'signaturedims', 'topcrashurlfacts', 'productdims'])],
  schema.TopCrashUrlFactsTable:[False,set(['urldims', 'signaturedims', 'topcrashurlfacts', 'productdims'])],
  schema.TopCrashersTable:[False,set(['topcrashers'])],
  schema.UrlDimsTable:[False,set(['urldims'])],
  }

schemaClasses = {}
def makeClassList():
  global schemaClasses
  for thing in dir(schema):
    item = getattr(schema,thing)
    try:
      if issubclass(item, schema.Table):
        if item in [schema.Table, schema.PartitionedTable]:
          continue
        if issubclass(item, schema.PartitionedTable):
          schemaClasses[item] = schema.PartitionedTable
        else:
          schemaClasses[item] = schema.Table
    except TypeError:
      pass
  assert set(hardCodedSchemaClasses.keys()) == set(schemaClasses.keys()), "You probably didn't update 'hardCodedSchemaClasses' in this test when you made a change in schema.py. Please do so now."
  expectedPartitionedTables = set([x for x in hardCodedSchemaClasses.keys() if hardCodedSchemaClasses[x][0]])
  seenPartitionedTables = set([x for x in schemaClasses.keys() if schema.PartitionedTable == schemaClasses[x]])
  assert expectedPartitionedTables == seenPartitionedTables, "Expected: %s, got: %s"%(expectedPartitionedTables,seenPartitionedTables)

def printDbTablenames(tag,aCursor):
  """Debugging utility"""
  all = socorro_psg.tablesMatchingPattern('%',aCursor)
  some = [x for x in all if (x == 'server_status' or not '_' in x)]
  some = [x for x in some if (not x in ['triggers','views','sequences','tables','domains','parameters','routines','schemata','attributes','columns'])]
  some.sort()
  print tag,', '.join(some)
  
def checkOneClass(aClass,aType):
  global me
  connection = psycopg2.connect(me.dsn)
  cursor = connection.cursor()
  table = aClass(logger = me.logger)
  expectedList = []
  expectedTableClasses = schema.getOrderedSetupList([aClass])
  for t in expectedTableClasses:
    expectedList.append(t(logger = me.logger))
  try:
    schema.teardownDatabase(me.config,me.logger)
    matchingTables = [x for x in socorro_psg.tablesMatchingPattern(table.name+'%',cursor) if not x.endswith('_id_seq')]
    assert [] == matchingTables ,'For class %s saw %s'%(table.name,matchingTables)
    # call create
    before = set(socorro_psg.tablesMatchingPattern('%',cursor))
    ignore = [x for x in before if (x.startswith('pg_toast') or x.endswith('id_seq'))]
    before -= set(ignore)
    table.create(cursor)
    connection.commit()
    after = set(socorro_psg.tablesMatchingPattern('%',cursor))
    ignore = [x for x in after if (x.startswith('pg_toast') or x.endswith('id_seq'))]
    after -= set(ignore)
    expectedDiff = hardCodedSchemaClasses[aClass][1]
    assert expectedDiff ==  after - before, 'for %s: after-before=\n   got:%s\nwanted:%s'%(table.name,after-before,expectedDiff)
    # call drop
    table.drop(cursor)
    connection.commit()
    afterDrop = set(socorro_psg.tablesMatchingPattern('%',cursor))
    assert not table.name in afterDrop
  finally:
    cursor.execute("DROP TABLE IF EXISTS %s CASCADE"%(','.join([x.name for x in expectedList])))
    connection.commit()
    connection.close()

def testCreateAndDropEachTable():
  """
  testCreateAndDropEachTable(): (slow=1)
  Loop through every table in the classes we discovered in schema.py and
   - check that the test is in sync with schema.py (in function makeClassList)
   - check that create works for each Table or PartitionedTable in schema.py
   - check that drop works for each Table or PartitionedTable in schema.py
  """
  global schemaClasses
  makeClassList()
  for c in schemaClasses:
    checkOneClass(c,schemaClasses[c])
  
