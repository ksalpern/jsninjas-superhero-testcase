import HeroModel from "../models/Hero.js";

export const getLastTags = async (req, res) => {
  try {
    const heros = await HeroModel.find().limit(5).exec();

    const tags = heros
      .map((obj) => obj.tags)
      .flat()
      .slice(0, 5);

    res.json(tags);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to get tags",
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const heros = await HeroModel.find().populate("user").exec();
    res.json(heros);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to get heros",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const heroId = req.params.id;

    HeroModel.findOneAndUpdate(
      {
        _id: heroId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: "after",
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: "Failed to return heros",
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: "Hero is not found",
          });
        }

        res.json(doc);
      }
    ).populate("user");
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to get heros",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const heroId = req.params.id;

    HeroModel.findOneAndDelete(
      {
        _id: heroId,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: "Failed to delete hero",
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: "Hero is not found",
          });
        }

        res.json({
          success: true,
        });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to get heros",
    });
  }
};

export const createHero = async (req, res) => {
  try {
    const doc = new HeroModel({
      nickName: req.body.nickName,
      realName: req.body.realName,
      description: req.body.description,
      catchPhrase: req.body.catchPhrase,
      tags: req.body.tags.split(","),
      imageUrl: req.body.imageUrl,
      user: req.userId,
    });

    const hero = await doc.save();

    res.json(hero);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to create hero",
    });
  }
};

export const update = async (req, res) => {
  try {
    const heroId = req.params.id;

    await HeroModel.updateOne(
      {
        _id: heroId,
      },
      {
        nickName: req.body.nickName,
        realName: req.body.realName,
        description: req.body.description,
        catchPhrase: req.body.catchPhrase,
        tags: req.body.tags.split(","),
        imageUrl: req.body.imageUrl,
        user: req.userId,
      }
    );

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to update hero",
    });
  }
};
