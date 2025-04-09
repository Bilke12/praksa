import User from '../models/User.js';

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.auth.userId);

    if (!user || user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Nemaš administratorski pristup.' });
    }

    next();
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};