/****************************************************************************
**
** Copyright (C) 2008 Nokia Corporation and/or its subsidiary(-ies).
** Contact: Qt Software Information (qt-info@nokia.com)
**
** This file is part of the tools applications of the Qt Toolkit.
**
** No Commercial Usage
** This file contains pre-release code and may only be used for
** evaluation and testing purposes.  It may not be used for commercial
** development.  You may use this file in accordance with the terms and
** conditions contained in the either Technology Preview License
** Agreement or the Beta Release License Agreement.
**
** GNU General Public License Usage
** Alternatively, this file may be used under the terms of the GNU
** General Public License versions 2.0 or 3.0 as published by the Free
** Software Foundation and appearing in the file LICENSE.GPL included in
** the packaging of this file.  Please review the following information
** to ensure GNU General Public Licensing requirements will be met:
** http://www.fsf.org/licensing/licenses/info/GPLv2.html and
** http://www.gnu.org/copyleft/gpl.html.  In addition, as a special
** exception, Nokia gives you certain additional rights. These rights
** are described in the Nokia Qt GPL Exception version 1.3, included in
** the file GPL_EXCEPTION.txt in this package.
**
** Qt for Windows(R) Licensees
** As a special exception, Nokia, as the sole copyright holder for Qt
** Designer, grants users of the Qt/Eclipse Integration plug-in the
** right for the Qt/Eclipse Integration to link to functionality
** provided by Qt Designer and its related libraries.
**
** If you are unsure which license is appropriate for your use, please
** contact the sales department at qt-sales@nokia.com.
**
****************************************************************************/
#include <QtCore>
#include <QtTest/QTest>
#include <shared.h>

class tst_deployment_mac : public QObject
{
Q_OBJECT
private slots:
    void testParseOtoolLibraryLine();
    void testgetQtFrameworks();
    void testFindAppBinarty();
};

void tst_deployment_mac::testParseOtoolLibraryLine()
{
{
    QString line = "   /Users/foo/build/qt-4.4/lib/QtGui.framework/Versions/4/QtGui (compatibility version 4.4.0, current version 4.4.0)";
    FrameworkInfo info = parseOtoolLibraryLine(line);    
//    qDebug() << info;
    QCOMPARE(info.frameworkDirectory, QLatin1String("/Users/foo/build/qt-4.4/lib/")); 
    QCOMPARE(info.frameworkName, QLatin1String("QtGui.framework")); 
    QCOMPARE(info.frameworkPath, QLatin1String("/Users/foo/build/qt-4.4/lib/QtGui.framework"));
    QCOMPARE(info.binaryDirectory, QLatin1String("Versions/4"));
    QCOMPARE(info.binaryName, QLatin1String("QtGui"));
    QCOMPARE(info.binaryPath, QLatin1String("/Versions/4/QtGui"));
    QCOMPARE(info.version, QLatin1String("4"));
    QCOMPARE(info.installName, QLatin1String("/Users/foo/build/qt-4.4/lib/QtGui.framework/Versions/4/QtGui"));
    QCOMPARE(info.deployedInstallName, QLatin1String("@executable_path/../Frameworks/QtGui.framework/Versions/4/QtGui"));
    QCOMPARE(info.sourceFilePath, QLatin1String("/Users/foo/build/qt-4.4/lib/QtGui.framework/Versions/4/QtGui"));
    QCOMPARE(info.destinationDirectory, QLatin1String("Contents/Frameworks/QtGui.framework/Versions/4"));
}
{
    QString line = "	/Users/foo/build/qt-4.4/lib/phonon.framework/Versions/4/phonon (compatibility version 4.1.0, current version 4.1.0)";
    FrameworkInfo info = parseOtoolLibraryLine(line);    
//    qDebug() << info;
    QCOMPARE(info.frameworkDirectory, QLatin1String("/Users/foo/build/qt-4.4/lib/")); 
    QCOMPARE(info.frameworkName, QLatin1String("phonon.framework")); 
    QCOMPARE(info.frameworkPath, QLatin1String("/Users/foo/build/qt-4.4/lib/phonon.framework"));
    QCOMPARE(info.binaryDirectory, QLatin1String("Versions/4"));
    QCOMPARE(info.binaryName, QLatin1String("phonon"));
    QCOMPARE(info.binaryPath, QLatin1String("/Versions/4/phonon"));
    QCOMPARE(info.version, QLatin1String("4"));
    QCOMPARE(info.installName, QLatin1String("/Users/foo/build/qt-4.4/lib/phonon.framework/Versions/4/phonon"));
    QCOMPARE(info.deployedInstallName, QLatin1String("@executable_path/../Frameworks/phonon.framework/Versions/4/phonon"));
    QCOMPARE(info.sourceFilePath, QLatin1String("/Users/foo/build/qt-4.4/lib/phonon.framework/Versions/4/phonon"));
    QCOMPARE(info.destinationDirectory, QLatin1String("Contents/Frameworks/phonon.framework/Versions/4"));
}

{
    QString line = "	/usr/local/Trolltech/Qt-4.4.0/lib/phonon.framework/Versions/4/phonon (compatibility version 4.1.0, current version 4.1.0)";
    FrameworkInfo info = parseOtoolLibraryLine(line);    
//    qDebug() << info;
    QCOMPARE(info.frameworkDirectory, QLatin1String("/usr/local/Trolltech/Qt-4.4.0/lib/")); 
    QCOMPARE(info.frameworkName, QLatin1String("phonon.framework")); 
    QCOMPARE(info.frameworkPath, QLatin1String("/usr/local/Trolltech/Qt-4.4.0/lib/phonon.framework"));
    QCOMPARE(info.binaryDirectory, QLatin1String("Versions/4"));
    QCOMPARE(info.binaryName, QLatin1String("phonon"));
    QCOMPARE(info.binaryPath, QLatin1String("/Versions/4/phonon"));
    QCOMPARE(info.version, QLatin1String("4"));
    QCOMPARE(info.installName, QLatin1String("/usr/local/Trolltech/Qt-4.4.0/lib/phonon.framework/Versions/4/phonon"));
    QCOMPARE(info.deployedInstallName, QLatin1String("@executable_path/../Frameworks/phonon.framework/Versions/4/phonon"));
    QCOMPARE(info.sourceFilePath, QLatin1String("/usr/local/Trolltech/Qt-4.4.0/lib/phonon.framework/Versions/4/phonon"));
    QCOMPARE(info.destinationDirectory, QLatin1String("Contents/Frameworks/phonon.framework/Versions/4"));
}

{
    QString line = "	QtGui.framework/Versions/4/QtGui (compatibility version 4.1.0, current version 4.1.0)";
    FrameworkInfo info = parseOtoolLibraryLine(line);    
//    qDebug() << info;
    QCOMPARE(info.frameworkDirectory, QLatin1String("/Library/Frameworks/")); 
    QCOMPARE(info.frameworkName, QLatin1String("QtGui.framework")); 
    QCOMPARE(info.frameworkPath, QLatin1String("/Library/Frameworks/QtGui.framework"));
    QCOMPARE(info.binaryDirectory, QLatin1String("Versions/4"));
    QCOMPARE(info.binaryName, QLatin1String("QtGui"));
    QCOMPARE(info.binaryPath, QLatin1String("/Versions/4/QtGui"));
    QCOMPARE(info.version, QLatin1String("4"));
    QCOMPARE(info.installName, QLatin1String("QtGui.framework/Versions/4/QtGui"));
    QCOMPARE(info.deployedInstallName, QLatin1String("@executable_path/../Frameworks/QtGui.framework/Versions/4/QtGui"));
    QCOMPARE(info.sourceFilePath, QLatin1String("/Library/Frameworks/QtGui.framework/Versions/4/QtGui"));
    QCOMPARE(info.destinationDirectory, QLatin1String("Contents/Frameworks/QtGui.framework/Versions/4"));
}

{
    QString line = "	phonon.framework/Versions/4/QtGui (compatibility version 4.1.0, current version 4.1.0)";
    FrameworkInfo info = parseOtoolLibraryLine(line);    
//    qDebug() << info;
    QCOMPARE(info.frameworkDirectory, QLatin1String("/Library/Frameworks/")); 
    QCOMPARE(info.frameworkName, QLatin1String("phonon.framework")); 
    QCOMPARE(info.frameworkPath, QLatin1String("/Library/Frameworks/phonon.framework"));
    QCOMPARE(info.binaryDirectory, QLatin1String("Versions/4"));
    QCOMPARE(info.binaryName, QLatin1String("phonon"));
    QCOMPARE(info.binaryPath, QLatin1String("/Versions/4/phonon"));
    QCOMPARE(info.version, QLatin1String("4"));
    QCOMPARE(info.installName, QLatin1String("phonon.framework/Versions/4/phonon"));
    QCOMPARE(info.deployedInstallName, QLatin1String("@executable_path/../Frameworks/phonon.framework/Versions/4/phonon"));
    QCOMPARE(info.sourceFilePath, QLatin1String("/Library/Frameworks/phonon.framework/Versions/4/phonon"));
    QCOMPARE(info.destinationDirectory, QLatin1String("Contents/Frameworks/phonon.framework/Versions/4"));
}

{
    QString line = "	/Users/foo/build/qt-4.4/lib/libQtCLucene.4.dylib (compatibility version 4.4.0, current version 4.4.0)";
    FrameworkInfo info = parseOtoolLibraryLine(line);    
//    qDebug() << info;
    QCOMPARE(info.frameworkDirectory, QLatin1String("/Users/foo/build/qt-4.4/lib/")); 
    QCOMPARE(info.binaryName, QLatin1String("libQtCLucene.4.dylib"));
    QCOMPARE(info.frameworkName, QLatin1String("libQtCLucene.4.dylib")); 
    QCOMPARE(info.frameworkPath, QLatin1String("/Users/foo/build/qt-4.4/lib/libQtCLucene.4.dylib"));
    QCOMPARE(info.installName, QLatin1String("/Users/foo/build/qt-4.4/lib/libQtCLucene.4.dylib"));
    QCOMPARE(info.deployedInstallName, QLatin1String("@executable_path/../Frameworks/libQtCLucene.4.dylib"));
    QCOMPARE(info.sourceFilePath, QLatin1String("/Users/foo/build/qt-4.4/lib/libQtCLucene.4.dylib"));
    QCOMPARE(info.destinationDirectory, QLatin1String("Contents/Frameworks/"));
}
{
    QString line = "libQtCLucene.4.dylib (compatibility version 4.4.0, current version 4.4.0)";
    FrameworkInfo info = parseOtoolLibraryLine(line);
//    qDebug() << info;
    QCOMPARE(info.frameworkDirectory, QLatin1String("/usr/lib/")); 
    QCOMPARE(info.binaryName, QLatin1String("libQtCLucene.4.dylib"));
    QCOMPARE(info.frameworkName, QLatin1String("libQtCLucene.4.dylib")); 
    QCOMPARE(info.frameworkPath, QLatin1String("/usr/lib/libQtCLucene.4.dylib"));
    QCOMPARE(info.installName, QLatin1String("libQtCLucene.4.dylib"));
    QCOMPARE(info.deployedInstallName, QLatin1String("@executable_path/../Frameworks/libQtCLucene.4.dylib"));
    QCOMPARE(info.sourceFilePath, QLatin1String("/usr/lib/libQtCLucene.4.dylib"));
    QCOMPARE(info.destinationDirectory, QLatin1String("Contents/Frameworks/"));
}
{
    QString line = "/foo"; //invalid
    FrameworkInfo info = parseOtoolLibraryLine(line);
    QCOMPARE(info.frameworkName, QString()); 
}

}

void tst_deployment_mac::testgetQtFrameworks()
{
{
    QStringList otool = QStringList()
	<< "/Users/foo/build/qt-4.4/lib/phonon.framework/Versions/4/phonon (compatibility version 4.1.0, current version 4.1.0)"
	<< "/Users/foo/build/qt-4.4/lib/QtGui.framework/Versions/4/QtGui (compatibility version 4.4.0, current version 4.4.0)"
	<< "/System/Library/Frameworks/Carbon.framework/Versions/A/Carbon (compatibility version 2.0.0, current version 136.0.0)"
	<< "/System/Library/Frameworks/AppKit.framework/Versions/C/AppKit (compatibility version 45.0.0, current version 949.27.0)"
	<< "/Users/foo/build/qt-4.4/lib/QtCore.framework/Versions/4/QtCore (compatibility version 4.4.0, current version 4.4.0)"
	<< "/usr/lib/libz.1.dylib (compatibility version 1.0.0, current version 1.2.3)"
	<< "/usr/lib/libSystem.B.dylib (compatibility version 1.0.0, current version 111.0.0)"
	<< "/usr/lib/libstdc++.6.dylib (compatibility version 7.0.0, current version 7.4.0)"
	<< "/usr/lib/libgcc_s.1.dylib (compatibility version 1.0.0, current version 1.0.0)"
    << " "
    ;
    
    QList<FrameworkInfo> frameworks = getQtFrameworks(otool);
    QCOMPARE(frameworks.count(), 3);
    QCOMPARE(frameworks.at(0).binaryName, QLatin1String("phonon"));
    QCOMPARE(frameworks.at(1).binaryName, QLatin1String("QtGui"));
    QCOMPARE(frameworks.at(2).binaryName, QLatin1String("QtCore"));
}
{
    QStringList otool = QStringList()
    << "QtHelp.framework/Versions/4/QtHelp (compatibility version 4.4.0, current version 4.4.0)"
	<< "libQtCLucene.4.dylib (compatibility version 4.4.0, current version 4.4.0)"
	<< "QtSql.framework/Versions/4/QtSql (compatibility version 4.4.0, current version 4.4.0)"
	<< "QtXml.framework/Versions/4/QtXml (compatibility version 4.4.0, current version 4.4.0)"
	<< "QtGui.framework/Versions/4/QtGui (compatibility version 4.4.0, current version 4.4.0)"
	<< "/System/Library/Frameworks/Carbon.framework/Versions/A/Carbon (compatibility version 2.0.0, current version 128.0.0)"
	<< "/System/Library/Frameworks/AppKit.framework/Versions/C/AppKit (compatibility version 45.0.0, current version 824.42.0)"
	<< "QtNetwork.framework/Versions/4/QtNetwork (compatibility version 4.4.0, current version 4.4.0)"
	<< "QtCore.framework/Versions/4/QtCore (compatibility version 4.4.0, current version 4.4.0)"
	<< "/usr/lib/libz.1.dylib (compatibility version 1.0.0, current version 1.2.3)"
	<< "/usr/lib/libSystem.B.dylib (compatibility version 1.0.0, current version 88.3.6)"
	<< "/usr/lib/libstdc++.6.dylib (compatibility version 7.0.0, current version 7.4.0)"
	<< "/usr/lib/libgcc_s.1.dylib (compatibility version 1.0.0, current version 1.0.0)"
    ;

    QList<FrameworkInfo> frameworks = getQtFrameworks(otool);
    QCOMPARE(frameworks.count(), 7);
    QCOMPARE(frameworks.at(0).binaryName, QLatin1String("QtHelp"));
    QCOMPARE(frameworks.at(1).binaryName, QLatin1String("libQtCLucene.4.dylib"));
    QCOMPARE(frameworks.at(2).binaryName, QLatin1String("QtSql"));
    QCOMPARE(frameworks.at(3).binaryName, QLatin1String("QtXml"));
    QCOMPARE(frameworks.at(4).binaryName, QLatin1String("QtGui"));
    QCOMPARE(frameworks.at(5).binaryName, QLatin1String("QtNetwork"));
    QCOMPARE(frameworks.at(6).binaryName, QLatin1String("QtCore"));
}

}

void tst_deployment_mac::testFindAppBinarty()
{
    QCOMPARE(findAppBinary("tst_deployment_mac.app"), QLatin1String("tst_deployment_mac.app/Contents/MacOS/tst_deployment_mac"));
}

QTEST_MAIN(tst_deployment_mac)

#include "tst_deployment_mac.moc"