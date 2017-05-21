<?php
declare(strict_types=1);

// DIC configuration

// -----------------------------------------------------------------------------
// Services (Dependencies)
// -----------------------------------------------------------------------------

// Create initial connection to DB
$db = new \It_All\BoutiqueCommerce\Postgres(
    $config['database']['name'],
    $config['database']['username'],
    $config['database']['password'],
    $config['database']['host'],
    $config['database']['port']
);

// Database
$container['db'] = function($container) use ($db) {
    return $db;
};

// Authentication
$container['authentication'] = function($container) {
    return new It_All\BoutiqueCommerce\Authentication\Authentication;
};

// Flash messages
$container['flash'] = function ($container) {
    return new \Slim\Flash\Messages();
};

// Form Former
$container['form'] = function ($container) {
    return new \It_All\FormFormer\Form();
};

// Twig
$container['view'] = function ($container) {
    $settings = $container->get('settings');
    $view = new \Slim\Views\Twig($settings['view']['pathTemplates'], [
        'cache' => $settings['view']['pathCache'],
        'auto_reload' => $settings['view']['autoReload'],
        'debug' => $settings['view']['debug']
    ]);

    // Instantiate and add Slim specific extension
    $basePath = rtrim(str_ireplace('index.php', '', $container['request']->getUri()->getBasePath()), '/');
    $view->addExtension(new Slim\Views\TwigExtension($container->router, $basePath));

    if ($settings['view']['debug']) {
        // allows {{ dump(var) }}
        $view->addExtension(new Twig_Extension_Debug());
    }

    // make auth class available inside templates
    $view->getEnvironment()->addGlobal('authentication', [
        'check' => $container->authentication->check(),
        'user' => $container->authentication->user()
    ]);

    // make flash messages available inside templates
    $view->getEnvironment()->addGlobal('flash', $container->flash);

    // make some config setting available inside templates
    $view->getEnvironment()->addGlobal('isLive', $settings['isLive']);
    $view->getEnvironment()->addGlobal('storeName', $settings['storeName']);

    return $view;
};

// Mailer
$container['mailer'] = function($container) {
    $settings = $container->get('settings');
    return $settings['mailer'];
};

// Logger
$container['logger'] = function($container) {
    $settings = $container->get('settings');
    $logger = new \Monolog\Logger('monologger');
    $file_handler = new \Monolog\Handler\StreamHandler($settings['storage']['pathLogs']);
    $logger->pushHandler($file_handler);
    return $logger;
};

// Form Validation
$container['validator'] = function ($container) {
    return new \It_All\BoutiqueCommerce\Services\Validator();
};

// CSRF
$container['csrf'] = function ($container) {
    return new \Slim\Csrf\Guard();
};

// End Services (Dependencies)

// Error Handling
unset($container['errorHandler']);
unset($container['phpErrorHandler']);

// -----------------------------------------------------------------------------
// Middleware registration
// -----------------------------------------------------------------------------
$slim->add(new It_All\BoutiqueCommerce\Middleware\CsrfViewMiddleware($container));
$slim->add($container->csrf);
