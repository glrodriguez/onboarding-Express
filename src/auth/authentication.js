// imports...


export default async (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log("Usuario validado");
    next();
  } else {
    return res.status(401).json({ message: 'You are not authenticated' });
  }
};
