# QCA GnuPG

# we don't moc gpgporc/sprocess.cpp
SET(QCA_GNUPG_MOC_SOURCES qca-gnupg.cpp gpgop.cpp gpgproc/gpgproc.cpp)

MY_AUTOMOC( QCA_GNUPG_MOC_SOURCES )

QT4_WRAP_CPP( EXTRA_GNUPG_SOURCES gpgop.h )
QT4_WRAP_CPP( EXTRA_GNUPG_SOURCES gpgproc/gpgproc.h )
QT4_WRAP_CPP( EXTRA_GNUPG_SOURCES gpgproc/sprocess.h )

ADD_LIBRARY(qca-gnupg SHARED ${QCA_GNUPG_MOC_SOURCES} gpgproc/sprocess.cpp ${EXTRA_GNUPG_SOURCES} )
INCLUDE_DIRECTORIES(gpgproc)
TARGET_LINK_LIBRARIES(qca-gnupg ${QT_QTCORE_LIBRARY} qca)

#TODO perhaps search adavapi on win32
IF (WIN32)
  TARGET_LINK_LIBRARIES(qca-gnupg advapi32)
ENDIF (WIN32)

INSTALL(TARGETS qca-gnupg LIBRARY DESTINATION ${qca_PLUGINSDIR})
