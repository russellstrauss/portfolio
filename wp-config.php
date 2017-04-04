<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, WordPress Language, and ABSPATH. You can find more information
 * by visiting {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

//define('RELOCATE', true);

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'russell_portfolio');

/** MySQL database username */
define('DB_USER', 'russell_admin');

/** MySQL database password */
define('DB_PASSWORD', 'admin');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'Br4N++-~_(h~XE0ba`lrC4;s!E_Q<|f Cn2D@6+AbHn2[-:~lZ+#?9mvOJgtxk4I');
define('SECURE_AUTH_KEY',  '.b(qE-$w/@Tg[h>PyqRGF:jf2HEM+R.>6W$Z~>L+k2RbnnBVrY:(KLzJ.<iN+xn}');
define('LOGGED_IN_KEY',    'KmK|ElOhc.iJW[Cu/%Ej5RMZmP<a1MW6!:8s*{]0]p&dG*.pRe0,Z;TB3Wz_GH-w');
define('NONCE_KEY',        '~Q6#C4TmDN+8~%-|0}K3P<$*Kbx!%bwe]9P7AVB~>[x:jgCC,:Bc://xOVsxOedS');
define('AUTH_SALT',        'g`)5=S-[ceL+=ehHLxuJmP.Y<1AmO$XS6D894n,M69wRe a!Nbi,aK@Wx8JYeJB>');
define('SECURE_AUTH_SALT', ',6qa*>|K9_kq@BHLthM6zmAkHk| &u$>Yv4%Xpkx$QL1d0oz6:dW!KH=cO;TtoY=');
define('LOGGED_IN_SALT',   ':LcUV3|X.;U|>ii(XAx8TfLJb+!c9[=gD4v!1dq$@M}~JU-+|@gc|53}htzBW/Au');
define('NONCE_SALT',       't2fG]$-oA+o`8II0|#1E|0-H4Xm*XW^kEDD!cDd8je8gt2^pXCRsT5|.PbIl({8J');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * WordPress Localized Language, defaults to English.
 *
 * Change this to localize WordPress. A corresponding MO file for the chosen
 * language must be installed to wp-content/languages. For example, install
 * de_DE.mo to wp-content/languages and set WPLANG to 'de_DE' to enable German
 * language support.
 */
define('WPLANG', '');

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
