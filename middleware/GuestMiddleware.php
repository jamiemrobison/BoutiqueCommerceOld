<?php
declare(strict_types=1);

namespace It_All\BoutiqueCommerce\Middleware;

class GuestMiddleware extends Middleware
{
    public function __invoke($request, $response, $next)
    {
        // if user signed in redirect to admin home
        if ($this->container->authentication->check()) {
            return $response->withRedirect($this->container->router->pathFor('crud.show', ['table' => 'admins']));
        }

        $response = $next($request, $response);
        return $response;
    }
}