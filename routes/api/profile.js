const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
const passport = require("passport");

const Profile = require("../../models/Profile");
const User = require("../../models/User");

const validateProfileInput = require("../../validation/profile");
const validateExperienceInput = require("../../validation/experience");

router.get("/test", (req, res) => {
  res.json({ msg: "Profile works" });
});

//////Get current user profile
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(400).json(err));
  }
);
//////////////Get all profiles

router.get("/all", (req, res) => {
  const errors = {};

  Profile.find()
    .populate("user", ["name", "avatar"])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = "There are no profiles";
        return res.status(404).json(errors);
      }

      res.json(profiles);
    })
    .catch(err => res.status(404).json({ profile: "There are no profiles" }));
});

//////////Get profile using handle

router.get("/handle/:handle", (req, res) => {
  const errors = {};

  Profile.findOne({ handle: req.params.handle }) //find handle from url handle param
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

//////Get profile by user id

router.get("/user/:user_id", (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id }) //find handle from url handle param
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

/////Post users profile
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    //Validation check
    if (!isValid) {
      return res.status(400).json(errors);
    }

    //Field entry logic
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;

    if (req.body.status) profileFields.status = req.body.status;
    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        //Editing profile logic
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        //Creating profile logic
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            //Check handle exists or not
            errors.handle = "The handle already exists";
            res.status(400).json(errors);
          }
          new Profile(profileFields) //Save the profile
            .save()
            .then(profile => {
              res.json(profile);
            });
        });
      }
    });
  }
);

/////////////Add experience to the profile(not adding experience collection)

router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newExp = {
        sno: req.body.sno,
        category: req.body.category,
        subcategory: req.body.subcategory,
        itemname: req.body.itemname,
        quantity: req.body.quantity,
        toxic: req.body.toxic,
        description: req.body.description
      };

      // Add to exp array
      profile.experience.unshift(newExp);

      profile.save().then(profile => res.json(profile));
    });
  }
);

//////////Delete PROFILE EXPERIENCE

router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const removeIndex = profile.experience
          .map(item => item.id)
          .indexOf(req.params.exp_id);

        //Splicing it out of array
        profile.experience.splice(removeIndex, 1);

        //Save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

//////////Delete PROFILE and USER

router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

module.exports = router;
