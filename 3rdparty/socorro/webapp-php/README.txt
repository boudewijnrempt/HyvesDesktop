Installation
============

# Copy htaccess-dist to .htaccess, tweak for installation host path if it's not
# at the domain root.
cp htaccess-dist .htaccess 
vim htaccess

# Change hosting path and domain in application/config/config.php
cp application/config/config.php-dist application/config/config.php
vim application/config/config.php

# Change database settings in application/config/database.php
cp application/config/database.php-dist application/config/database.php
vim application/config/database.php

# Switch between file-based or memcache-based caching in application/config/cache.php
vim application/config/cache.php

# Change memcache settings in application/config/cache_memcache.php
cp application/config/cache_memcache.php-dist application/config/cache_memcache.php
vim application/config/cache_memcache.php

# Ensure that the application logs and cache directories can be written to
chmod a+rw application/logs application/cache

