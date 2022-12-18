import { NextFunction, Request, Response } from 'express';
import { controller, get, use } from './decorators';

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

function requireAuth(
  req: RequestWithBody,
  res: Response,
  next: NextFunction
): void {
  if (req.session && req.session.loggedIn) {
    next();
  }
  res.status(403).send('not permitted');
}

@controller('')
class RootController {
  @get('/')
  getRoot(req: RequestWithBody, res: Response) {
    if (req.session && req.session.loggedIn) {
      res.status(200).send(
        `
                <h1>you are logged in</h1>
                <a href='/auth/logout'>log out</a>
            `
      );
    } else {
      res.status(401).send(
        `
                <h1>you are not logged in</h1>
                <a href='/auth/login'>log in</a>
            `
      );
    }
  }

  @get('/protected')
  @use(requireAuth)
  getProtected(req: RequestWithBody, res: Response) {
    res.send('welcome to protected route');
  }
}
