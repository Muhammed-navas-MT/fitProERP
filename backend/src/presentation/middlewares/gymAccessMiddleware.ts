// export class GymAccessMiddleware {
//   constructor(
//     private readonly gymRepository: IGymRepository
//   ) {}

//   verifyGymAccess = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ) => {
//     const subdomain = req.tenant;          // fitpro
//     const gymIdFromToken = res.locals.user?.gymId;

//     if (!subdomain || !gymIdFromToken) {
//       return res.status(403).json({
//         success: false,
//         message: "Unauthorized gym access"
//       });
//     }

//     // Fetch gym by subdomain
//     const gym = await this.gymRepository.findBySubdomain(subdomain);

//     if (!gym) {
//       return res.status(403).json({
//         success: false,
//         message: "Gym does not exist"
//       });
//     }

//     // 🔥 CORE CHECK
//     if (gym.id !== gymIdFromToken) {
//       return res.status(403).json({
//         success: false,
//         message: "You are not allowed to access this gym"
//       });
//     }

//     // Optional extra checks
//     if (!gym.isActive || !gym.isVerified) {
//       return res.status(403).json({
//         success: false,
//         message: "Gym is inactive or not verified"
//       });
//     }

//     // Attach gym to request
//     req.gym = gym;

//     next();
//   };
// }
