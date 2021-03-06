/*
 * Hyves Desktop, Copyright (C) 2008-2009 Hyves (Startphone Ltd.)
 * http://www.hyves.nl/
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  US
 */

#include <QtCore>

#include "config.h"
#include "extender/Extender.h"
#include "idle.h"
#include "jabber/Jabber.h"
#include "Informer.h"
#include "Util.h"

namespace Informer {

Informer *Informer::s_instance = 0;

struct Informer::Private {
	Idle idle;
};

Informer *Informer::instance() {
	
	if (s_instance == 0) {
		s_instance = new Informer();
	}
	
	return s_instance;
}

void Informer::destroy() {
	
	delete s_instance;
	s_instance = 0;
}

QString Informer::systemInfoJSON() {
	
	QVariantMap map;
	map["product"] = HD_PRODUCT_NAME;
	map["version"] = HD_VERSION.toString();
	map["platform"] = HD_PLATFORM;
	
	return Util::variantMapToJSON(map);
}

Informer::Informer() :
	m_d(new Private()) {
	
	connect(Jabber::Jabber::instance(), SIGNAL(connected()), SLOT(loggedIn()));
	connect(Jabber::Jabber::instance(), SIGNAL(disconnected()), SLOT(loggedOut()));
	
	Extender::Extender::instance()->registerObject("informer", this);
}

Informer::~Informer() {
	
	Extender::Extender::instance()->unregisterObject("informer");
	
	m_d->idle.stop();
	delete m_d;
}

void Informer::loggedIn() {
	
	connect(&m_d->idle, SIGNAL(secondsIdle(int)), SIGNAL(secondsIdle(int)));
	m_d->idle.start();
}

void Informer::loggedOut() {
	
	m_d->idle.stop();
	m_d->idle.disconnect(SIGNAL(secondsIdle(int)));
}

} // namespace Informer
