<?php
declare(strict_types=1);

namespace It_All\BoutiqueCommerce\Src\Infrastructure\Security\Authentication;

use It_All\BoutiqueCommerce\Src\Infrastructure\Middleware;

class AuthenticationMiddleware extends Middleware
{
	public function __invoke($request, $response, $next)
	{
		// check if the user is not signed in
		if (!$this->container->authentication->check()) {
			$this->container->flash->addMessage('error', 'Please sign in before doing that.');
			return $response->withRedirect($this->container->router->pathFor('authentication.login'));
		}

		$response = $next($request, $response);
		return $response;
	}
}