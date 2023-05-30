const sequelize = require("../config/db");
const User = require("../models/User");
const Place = require("../models/Place")(sequelize);
const Review = require("../models/Review")(sequelize);

//create place

exports.createPlace = async (req, res, next) => {
  try {
    const place = await Place.create(req.body);
    res.status(201).json({
      success: true,
      data: place,
    });
  } catch (error) {
    if (
      typeof error === "object" &&
      error.name === "SequelizeUniqueConstraintError"
    ) {
      res.status(400).json({
        success: false,
        error: "A place with the same coordinates already exists",
      });
    } else {
      next(error);
    }
  }
};

//get all places

exports.getAllPlaces = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;

    const places = await Place.findAll({
      attributes: [
        "id",
        "name",
        "description",
        "longitude",
        "latitude",
        "location",
        "created_at",
        "updated_at",
      ],
      limit,
      offset,
    });

    res.status(200).json({
      success: true,
      data: places,
    });
  } catch (error) {
    next(error);
  }
};

//get single place

exports.getPlaceById = async (req, res, next) => {
  // const {
  //   models: { Review },
  // } = sequelize;
  const { Place, Trip } = require("../models/associations")(sequelize);
  const place = await Place.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: Review,
        attributes: ["id", "rating", "comment", "created_at", "updated_at"],
      },
      {
        model: Trip,
        attributes: ["id", "name", "description"],
      },
    ],
  });
  if (!place) {
    return next(
      new ErrorResponse(`Place not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: place,
  });
};

//update place

exports.updatePlace = async (req, res, next) => {
  const place = await Place.findByPk(req.params.id);
  if (!place) {
    return next(
      new ErrorResponse(`Place not found with id of ${req.params.id}`, 404)
    );
  }
  await place.update(req.body);
  res.status(200).json({
    success: true,
    data: place,
  });
};

//delete place

exports.deletePlace = async (req, res, next) => {
  const place = await Place.findByPk(req.params.id);
  if (!place) {
    return next(
      new ErrorResponse(`Place not found with id of ${req.params.id}`, 404)
    );
  }
  await place.destroy();
  res.status(200).json({
    success: true,
    data: {},
  });
};

//get user places

// exports.getUserPlaces = async (req, res, next) => {
//   const { Place, Trip } = require("../models/associations")(sequelize);
//   try {
//     const places = await Place.findAll({
//       where: { user_id: req.user.id },
//       include: [
//         {
//           model: Review,
//           attributes: ["id", "rating", "comment", "created_at", "updated_at"],
//         },
//         {
//           model: Trip,
//           attributes: ["id", "name", "description"],
//         },
//       ],
//     });
//     res.status(200).json({
//       success: true,
//       data: places,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

exports.getUserPlaces = async (req, res) => {
  const { User, Group, Trip, Place, GroupMember } = require("../models/associations")(sequelize);
  const userId = req.user.id;

  try {
    const user = await User.findOne({
      where: { id: userId },
      include: {
        model: GroupMember,
        include: {
          model: Group,
          include: {
            model: Trip,
            include: {
              model: TripPlace,
              include: {
                model: Place,
              },
            },
          },
        },
      },
    });

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    const places = user.GroupMembers.map((groupMember) =>
      groupMember.Group.Trips.map((trip) =>
        trip.TripPlaces.map((tripPlace) => tripPlace.Place)
      )
    ).flat(3); // We use .flat(3) to flatten the array three levels deep

    res.status(200).send(places);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error: "An error occurred while retrieving places for the user",
    });
  }
};

//get user place

exports.getUserPlaceById = async (req, res, next) => {
  const { Place, Trip } = require("../models/associations")(sequelize);
  try {
    const { placeId } = req.params;
    const userId = req.user.id;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }
    const userGroups = await user.getGroups();
    const userGroupIds = userGroups.map(
      (group) => group.created_by === user.id
    );
    console.log(userGroupIds);
    const Usertrips = await Trip.findOne({
      where: {
        group_id: userGroupIds,
      },
    });
    if (!Usertrips) {
      return res.status(404).json({
        success: false,
        error: "Trip not found",
      });
    }
    const tripId = Usertrips.id;
    const place = await Usertrips.getPlaces({
      where: {
        id: placeId,
      },
    });
    const place1 = await Place.findByPk(placeId, {
      include: [
        {
          model: Review,
          attributes: ["id", "rating", "comment", "created_at", "updated_at"],
        },
        {
          model: Trip,
          attributes: ["id", "name", "description"],
        },
      ],
    });
    console.log(place1);
    if (!place) {
      return res.status(404).json({
        success: false,
        error: "Place not found",
      });
    }
    res.status(200).json({
      success: true,
      data: place,
    });
  } catch (error) {
    next(error);
  }
};
