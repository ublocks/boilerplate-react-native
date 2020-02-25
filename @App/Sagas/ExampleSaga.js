import { put, call } from 'redux-saga/effects';
import { Alert } from 'react-native';
import ExampleActions from 'App/Stores/Example/Actions';
import { Handler, Example } from 'App/Apis';

/**
 * A saga can contain multiple functions.
 *
 * This example saga contains only one to fetch fake user information.
 * Feel free to remove it.
 */
export function* fetchUser() {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  yield put(ExampleActions.fetchUserLoading());

  // Fetch user information from an API
  const id = Math.floor(Math.random() / 0.1) + 1;
  const res = yield call(Handler.get(), Example.getUsers(id));
  if (res.data) {
    yield put(ExampleActions.fetchUserSuccess(res.data));
  } else {
    yield put(
      ExampleActions.fetchUserFailure(
        'There was an error while fetching user information.',
      ),
    );
  }
}

export function* createPost() {
  const res = yield call(
    Handler.post({
      data: {
        title: 'foo',
        body: 'bar',
        userId: 1,
      },
    }),
    Example.postNewPost(),
  );
  if (res.data) {
    Alert.alert('Create Post Success', `Post Id: ${res.data.id}`);
  } else {
    Alert.alert('Create Post Failed', JSON.stringify(res));
  }
}
