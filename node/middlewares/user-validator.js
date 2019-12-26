
import usersModel from '../models/user';

const userValidator = {
  validateUser: (req, res, next) => {
      const user = usersModel.getUser(req.params.id);
      if (user.length === 0 || 
        (user[0].hasOwnProperty('isDeleted') && user[0].isDeleted === true)) {
          res.status(404).json({ status: 404, error: 'user not found.' });
      }
      req.user = user[0];
      next();
  },
};

module.exports = userValidator;