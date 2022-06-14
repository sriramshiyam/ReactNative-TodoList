import {NativeBaseProvider} from 'native-base';
import React from 'react';
import TodoList from './components/TodoList';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import dataReducer from './components/data';

const store = configureStore({
  reducer: {
    data: dataReducer,
  },
});

const App = () => {

  return (
    <>  
      <NativeBaseProvider>
        <Provider store={store}>
          <TodoList />
        </Provider>
      </NativeBaseProvider>
    </>
  );
};

export default App;
