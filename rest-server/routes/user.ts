import { Router } from 'express';
import { deleteUser, getUser, getUsers, postUser, putUser, writeUserInCSV, insertUsersInDBFromCSV } from '../controllers/user';

const router = Router();

router.post( '/insert-user-in-db-from-csv' , insertUsersInDBFromCSV )
router.post( '/write-user-in-csv', writeUserInCSV );
router.get( '/',        getUsers );
router.get( '/:id',     getUser );
router.post( '/',       postUser );
router.put( '/:id',     putUser );
router.delete( '/:id',  deleteUser );

export default router;