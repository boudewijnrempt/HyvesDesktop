/****************************************************************************
**
** This file is part of a Qt Solutions component.
** 
** Copyright (c) 2009 Nokia Corporation and/or its subsidiary(-ies).
** 
** Contact:  Qt Software Information (qt-info@nokia.com)
** 
** Commercial Usage  
** Licensees holding valid Qt Commercial licenses may use this file in
** accordance with the Qt Solutions Commercial License Agreement provided
** with the Software or, alternatively, in accordance with the terms
** contained in a written agreement between you and Nokia.
** 
** GNU Lesser General Public License Usage
** Alternatively, this file may be used under the terms of the GNU Lesser
** General Public License version 2.1 as published by the Free Software
** Foundation and appearing in the file LICENSE.LGPL included in the
** packaging of this file.  Please review the following information to
** ensure the GNU Lesser General Public License version 2.1 requirements
** will be met: http://www.gnu.org/licenses/old-licenses/lgpl-2.1.html.
** 
** In addition, as a special exception, Nokia gives you certain
** additional rights. These rights are described in the Nokia Qt LGPL
** Exception version 1.0, included in the file LGPL_EXCEPTION.txt in this
** package.
** 
** GNU General Public License Usage 
** Alternatively, this file may be used under the terms of the GNU
** General Public License version 3.0 as published by the Free Software
** Foundation and appearing in the file LICENSE.GPL included in the
** packaging of this file.  Please review the following information to
** ensure the GNU General Public License version 3.0 requirements will be
** met: http://www.gnu.org/copyleft/gpl.html.
** 
** Please note Third Party Software included with Qt Solutions may impose
** additional restrictions and it is the user's responsibility to ensure
** that they have met the licensing requirements of the GPL, LGPL, or Qt
** Solutions Commercial license and the relevant license of the Third
** Party Software they are using.
** 
** If you are unsure which license is appropriate for your use, please
** contact the sales department at qt-sales@nokia.com.
** 
****************************************************************************/

#ifndef PUNCHFILTER_H
#define PUNCHFILTER_H

#include "qtimagefilter.h"

#include <QSlider>

const QString PUNCH_ID = "Punch";

class PunchFilter : public QtImageFilter {
	
	Q_OBJECT
	
public:
	PunchFilter();
	////
	// INHERITED FROM QtImageFilter
	////
	QVariant option(int filteroption) const;
	bool setOption(int option, const QVariant &value);
	bool supportsOption(int option) const;
	QList<int> options() const;
	QImage apply(const QImage &img, const QRect& clipRect = QRect() );
	QString name() const { return QObject::tr("Punch Effect"); }
	QString description() const { return QObject::tr("A parametrized circular pinch/punch filter", "PunchFilter"); }
	QString id() const { return PUNCH_ID; }
	QWidget* controlsWidget(QLabel *previewLabel, QImage originalPreviewImage);

public slots:	
	
	virtual void resetOptions();	
	
private slots:
	
	void handleControlValueChanged();
	
private:

	bool Punch(const QImage &img, QImage *outputImage, const QRect &clipRect = QRect() ) const;
	
private:
	double      m_Radius;
	QPointF     m_Center;
	double      m_Force;
	
	QMap<QString, QSlider*> m_sliders;
	
};
#endif  /* PUNCHFILTER_H */
