const router = require('express').Router();
const {
   get_all_thoughts,
   get_thought_by_id,
   post_new_thought,
   update_thought_by_id,
   delete_thought_by_id,
   add_reaction,
   delete_reaction
} = require('../../controllers/thought_controller');

// we are in /api/thoughts/

router.route('/')
   .get(get_all_thoughts)
   .post(post_new_thought);
router.route('/:id')
   .get(get_thought_by_id)
   .put(update_thought_by_id)
   .delete(delete_thought_by_id);
router.route('/:thoughtId/reactions')
   .post(add_reaction);
router.route('/:thoughtId/:reactionId')
   .delete(delete_reaction);
module.exports = router;
