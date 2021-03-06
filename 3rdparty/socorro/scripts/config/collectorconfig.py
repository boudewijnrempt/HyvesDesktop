import stat
import re

import socorro.lib.ConfigurationManager as cm

# Storage constants

try:
  from config.commonconfig import storageRoot
  from config.commonconfig import deferredStorageRoot
  from config.commonconfig import jsonFileSuffix
  from config.commonconfig import dumpFileSuffix
except ImportError:
  from commonconfig import storageRoot
  from commonconfig import deferredStorageRoot
  from commonconfig import jsonFileSuffix
  from commonconfig import dumpFileSuffix

# Dump files are stored with these permissions
dumpPermissions = cm.Option()
dumpPermissions.default = stat.S_IRGRP | stat.S_IWGRP | stat.S_IRUSR | stat.S_IWUSR

dirPermissions = cm.Option()
dirPermissions = stat.S_IRGRP | stat.S_IXGRP | stat.S_IWGRP | stat.S_IRUSR | stat.S_IXUSR | stat.S_IWUSR

# Set the group ID on minidumps so that they can be deleted by other users.
# (optional)
dumpGID = cm.Option()
dumpGID.default = None
# dumpGID.default = 501
dumpGID.doc="Set the group ID on minidumps so that they can be deleted by other users (optional)"

# The form field the client sends the dump in
dumpField = cm.Option()
dumpField.default = "upload_file_minidump"

# The number of dumps to be stored in a single directory
dumpDirCount = cm.Option()
dumpDirCount.default = 1024

# when storing in the file system, how deep should the radix directory depth be
storageDepth = cm.Option()
storageDepth.default = 2

# Returned to the client with a uuid following
dumpIDPrefix = cm.Option()
dumpIDPrefix.default = "bp-"

throttleConditions = cm.Option()
throttleConditions.default = [
  ("Version", lambda x: x[-3:] == "pre" or x[3] in 'ab', 100), # queue 100% of crashes with version ending in "pre" or having 'a' or 'b'
  #("Add-ons", re.compile('inspector\@mozilla\.org\:1\..*'), 75), # queue 75% of crashes where the inspector addon is at 1.x
  #("UserID", "d6d2b6b0-c9e0-4646-8627-0b1bdd4a92bb", 100), # queue all of this user's crashes
  #("SecondsSinceLastCrash", lambda x: 300 >= int(x) >= 0, 100), # queue all crashes that happened within 5 minutes of another crash
  (None, True, 10) # queue 10% of what's left
]

logFilePathname = cm.Option()
logFilePathname.doc = 'full pathname for the log file'
logFilePathname.default = '/var/log/socorro/collector.log'

logFileMaximumSize = cm.Option()
logFileMaximumSize.doc = 'maximum size in bytes of the log file'
logFileMaximumSize.default = 1000000

logFileMaximumBackupHistory = cm.Option()
logFileMaximumBackupHistory.doc = 'maximum number of log files to keep'
logFileMaximumBackupHistory.default = 50

logFileLineFormatString = cm.Option()
logFileLineFormatString.doc = 'python logging system format for log file entries'
logFileLineFormatString.default = '%(asctime)s %(levelname)s - %(message)s'

logFileErrorLoggingLevel = cm.Option()
logFileErrorLoggingLevel.doc = 'logging level for the log file (10 - DEBUG, 20 - INFO, 30 - WARNING, 40 - ERROR, 50 - CRITICAL)'
logFileErrorLoggingLevel.default = 10


