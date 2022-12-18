import { NextFunction, Request, Response } from 'express';
import { get, controller, use, post, bodyValidator } from './decorators';

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

@controller('/auth')
class LoginController {

  @get('/login')
  getLogin(req: Request, res: Response): void {
    res.send(
      `
            <form method='post'>
                <div>
                    <label>email</label>
                    <input name='email' type='text'/>
                </div>
                <div>
                    <label>password</label>
                    <input name='password' type='text'/>
                </div>
                <button type='submit'>submit</button>
            </form>
        `
    );
  }

  @post('/login')
  @bodyValidator('email', 'password')
  postLogin(req: RequestWithBody, res: Response) {
    const { email, password } = req.body;
    if (email === 'tt@email.com' && password === 'password') {
      req.session = { loggedIn: true };
      res.redirect('/');
    } else {
      res.status(401).send(
        `
            unable to log in
        `
      );
    }
  }

  @get('/logout')
  getLogout(req: Request, res: Response) {
    req.session = undefined;
    res.redirect('/');
  }
}
