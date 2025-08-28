import { Request, Response, NextFunction } from 'express';
import User from '../model/User'
import passport from 'passport'
import { getToken } from '../middlewares/authenticate'

export const UserGetController = (req: Request, res: Response) => {
    User.find({}).then((user: any) => {
        res.status(200).json({ user: user })
    }).catch((err) => {
        res.status(500).json({ err: err })
    })
}

export const UserSignUp = ((req: Request, res: Response) => {
    User.register(new User({
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }), req.body.password, (err: any, user: any) => {
        if (err) {
            res.status(500).json({ success: false, message: err })
        }
        else {
            user.save()
                .then((user: any) => {
                    passport.authenticate('local')(req, res, () => {
                        res.status(200).json({ success: true, message: 'User is created' });
                    })
                })
                .catch((err: any) => {
                    res.status(500).json({ success: false, message: err })
                })
        }
    })
})

export const UserLogin = ((req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("local", (err: any, user: any, info: any) => {
        if (err) {
            res.status(500).json({ success: false, err: err })
        }
        else if (!user) {
            res.status(401).json({ success: false, err: info.name, message: info.name })
        }
        else {

            req.logIn(user, (error) => {
                if (error) {
                    return res.status(500).json({ success: false, err: error.message });
                }
                let token: string = getToken({ _id: user._id });
                res.status(200).json({ success: true, token: token })
            })
        }
    })(req, res, next);
})



export const ResetPassword = async (req: Request, res: Response) => {
    try {
        const user = await User.findByUsername(req.body.username, false);
        if (!user) {
            return res.status(401).json({ success: false, message: "User not found" });
        }
        user.setPassword(req.body.password, async (err: any, user: any) => {
            if (err) {
                return res.status(500).json({ success: false, message: "Password failed to change" });
            }
            await user.save();
            return res.status(200).json({ success: true, message: "Password changed" });
        });
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const ChangePassword = async (req: Request, res: Response) => {
    try {
        const user = await User.findByUsername(req.body.username, false);
        console.log(req.body)
        if (!user) {
            return res.status(401).json({ success: false, message: "User not found" });
        }
        user.changePassword(req.body.oldPassword,req.body.newPassword, async (err: any, user: any) => {
            if (err) {
                return res.status(500).json({ success: false, message: err.message });
            }
            return res.status(200).json({ success: true, message: "Password changed" });
        });
    } catch (err) {
        res.status(500).json({ error: err });
    }
}

