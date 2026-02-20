import _ from 'lodash';
import Club from '../models/Club.js';
import ClubMember from '../models/ClubMember.js';

export const get = async ({ query }, res, next) => {
  try {
    let clubs = [];
    if (_.isEmpty(query)) {
      clubs = await Club.query()
        .select(
          'clubs.*',
          'owners.first_name as owner_fname',
          'owners.last_name as owner_lname',
        )
        .join({ owners: 'users' }, 'clubs.owner_id', 'owners.id');
    } else if (query.user_id) {
      clubs = await Club.query()
        .select(
          'clubs.*',
          'owners.first_name as owner_fname',
          'owners.last_name as owner_lname',
          'club_members.role as member_role',
          'club_members.status as member_status',
        )
        .join({ club_members: 'club_members' }, 'clubs.id', 'club_members.club_id')
        .join({ owners: 'users' }, 'clubs.owner_id', 'owners.id')
        .where('club_members.user_id', query.user_id);
    } else {
      clubs = await Club.query().where(query);
    };

    res.json(clubs);
  } catch (err) {
    next(err);
  };
};

export const create = async (req, res, next) => {
  try {
    const ownerId = req.body.owner_id ?? req.auth?.sub;
    if (_.isNil(ownerId)) {
      return res.status(400).json({ error: 'owner_id is required' });
    };

    const club = await Club.transaction(async (trx) => {
      const createdClub = await Club.query(trx).insert({
        ...req.body,
        owner_id: ownerId,
      });

      await ClubMember.query(trx).insert({
        club_id: createdClub.id,
        user_id: ownerId,
        invited_by_user_id: ownerId,
        role: 'owner',
        status: 'active',
        joined_at: new Date().toISOString(),
      });

      return createdClub;
    });

    res.json(club);
  } catch (err) {
    next(err);
  };
};

export const update = async (req, res, next) => {
  try {
    const club = await Club.query().patch(req.body).where({ id: req.params.id });
    res.json(club);
  } catch (err) {
    next(err);
  };
};

export const remove = async (req, res, next) => {
  try {
    const club = await Club.query().delete().where({ id: req.params.id });
    res.json(club);
  } catch (err) {
    next(err);
  };
};
