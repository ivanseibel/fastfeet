import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default (reducers) => {
  const persistedReducer = persistReducer(
    {
      key: 'fastfeet',
      storage,
      whitelist: [
        'auth',
        'user',
        'deliveries',
        'deliverymen',
        'recipients',
        'issues',
      ],
    },
    reducers
  );

  return persistedReducer;
};
