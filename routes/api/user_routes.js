const router = require('express').Router();
const {
   get_all_users,
   get_user_by_id,
   post_new_user,
   update_user_by_id,
   delete_user_by_id,
   add_friend,
   delete_friend
} = require('../../controllers/user_controller');

// we are in /api/users/

router.route('/')
   .get(get_all_users)
   .post(post_new_user);

/*
router.route('/:id')
   .get(get_user_by_id)
   .put(update_user_by_id)
   .delete(delete_user_by_id);
router.route('/:userId/friends/:friendId')
   .post(add_friend)
   .delete(delete_friend);
*/
module.exports = router;
