const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');

      return next(); // ✅ return here to stop further execution

    } catch (error) {
      return res.status(401).json({ error: 'Not authorized, token failed' });
    }
  }

  // ✅ Only gets here if no token or bad format
  return res.status(401).json({ error: 'Not authorized, no token' });
};
