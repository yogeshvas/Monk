import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import {
  Svg,
  Text as SvgText,
  Defs,
  LinearGradient as SvgLinearGradient,
  Stop,
} from 'react-native-svg';

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

interface RouteProps {
  tasks: Task[];
  addTask?: () => void;
  completeTask?: (id: string) => void;
  deleteTask: (id: string) => void;
  newTask?: string;
  setNewTask?: (text: string) => void;
}

const TaskItem: React.FC<{
  task: Task;
  completeTask?: (id: string) => void;
  deleteTask: (id: string) => void;
}> = ({task, completeTask, deleteTask}) => (
  <View style={styles.taskItem}>
    <Svg height="24" width="100%">
      <Defs>
        <SvgLinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0" stopColor="#AFF6CF" stopOpacity="1" />
          <Stop offset="1" stopColor="#9F98E8" stopOpacity="1" />
        </SvgLinearGradient>
      </Defs>
      <SvgText
        fill="url(#grad)"
        fontSize="14"
        fontFamily="Poppins-Medium"
        x="0"
        y="20"
        textAnchor="start">
        {task.text}
      </SvgText>
    </Svg>
    <View style={styles.taskButtons}>
      {completeTask && (
        <TouchableOpacity
          onPress={() => completeTask(task.id)}
          style={styles.buttonDone}>
          <Text style={styles.DoneButtonText}>Done</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        onPress={() => deleteTask(task.id)}
        style={styles.buttonDelete}>
        <Text style={styles.DeleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const FirstRoute: React.FC<RouteProps> = ({
  tasks,
  addTask,
  completeTask,
  deleteTask,
  newTask,
  setNewTask,
}) => {
  return (
    <View style={[styles.scene, {backgroundColor: '#101115'}]}>
      <FlatList
        data={tasks.filter(task => !task.completed).reverse()}
        renderItem={({item}) => (
          <TaskItem
            task={item}
            completeTask={completeTask}
            deleteTask={deleteTask}
          />
        )}
        keyExtractor={item => item.id}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add task"
          placeholderTextColor="#ccc"
          value={newTask}
          onChangeText={setNewTask}
        />
        <TouchableOpacity onPress={addTask} style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const SecondRoute: React.FC<RouteProps> = ({tasks, deleteTask}) => (
  <View style={[styles.scene, {backgroundColor: '#101115'}]}>
    <FlatList
      data={tasks.filter(task => task.completed)}
      renderItem={({item}) => <TaskItem task={item} deleteTask={deleteTask} />}
      keyExtractor={item => item.id}
    />
  </View>
);

const Todo: React.FC = ({navigation}: any) => {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState<number>(0);
  const [routes] = useState([
    {key: 'first', title: 'Open'},
    {key: 'second', title: 'Completed'},
  ]);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>('');

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const saveTasks = async (tasks: Task[]) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error(error);
    }
  };

  const addTask = useCallback(() => {
    if (newTask.trim()) {
      const newTaskObj: Task = {
        id: Date.now().toString(),
        text: newTask,
        completed: false,
      };
      const updatedTasks = [...tasks, newTaskObj];
      setTasks(updatedTasks);
      setNewTask('');
      saveTasks(updatedTasks);
    }
  }, [newTask, tasks]);

  const completeTask = useCallback(
    (id: string) => {
      const updatedTasks = tasks.map(task =>
        task.id === id ? {...task, completed: true} : task,
      );
      setTasks(updatedTasks);
      saveTasks(updatedTasks);
    },
    [tasks],
  );

  const deleteTask = useCallback(
    (id: string) => {
      const updatedTasks = tasks.filter(task => task.id !== id);
      setTasks(updatedTasks);
      saveTasks(updatedTasks);
    },
    [tasks],
  );

  const renderScene = ({route}: {route: {key: string}}) => {
    switch (route.key) {
      case 'first':
        return (
          <FirstRoute
            tasks={tasks}
            addTask={addTask}
            completeTask={completeTask}
            deleteTask={deleteTask}
            newTask={newTask}
            setNewTask={setNewTask}
          />
        );
      case 'second':
        return <SecondRoute tasks={tasks} deleteTask={deleteTask} />;
      default:
        return null;
    }
  };

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: '#FF007F'}}
      style={{backgroundColor: '#101115'}}
      labelStyle={{color: 'white', fontFamily: 'Poppins-Medium'}}
    />
  );

  return (
    <>
      <View>
        <View style={styles.header}>
          <Svg height="24" width="100%">
            <Defs>
              <SvgLinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
                <Stop offset="0" stopColor="#AFF6CF" stopOpacity="1" />
                <Stop offset="1" stopColor="#9F98E8" stopOpacity="1" />
              </SvgLinearGradient>
            </Defs>
            <SvgText
              fill="url(#grad)"
              fontSize="24"
              fontFamily="Poppins-Regular"
              x="0"
              y="20"
              textAnchor="start">
              You have {tasks.filter(task => !task.completed).length} open
              tasks.
            </SvgText>
          </Svg>
        </View>
      </View>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        renderTabBar={renderTabBar}
      />
    </>
  );
};

export default Todo;

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  input: {
    flex: 1,
    fontFamily: 'Poppins-Medium',
    padding: 12,
    paddingHorizontal: 15,
    borderRadius: 5,
    color: 'white',
    marginRight: 10,
    backgroundColor: '#21212C',
  },
  addButton: {
    backgroundColor: '#1B282C',
    borderRadius: 5,
    padding: 12,
  },
  addButtonText: {
    color: '#78D9C9',
    fontSize: 20,
  },
  taskItem: {
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    // borderBottomColor: '#393e46',
    // borderBottomWidth: 1,
    width: '100%',
    backgroundColor: '#21212C',
    marginTop: 14,
    borderRadius: 4,
  },

  taskButtons: {
    flexDirection: 'row',
    marginTop: 15,
    alignItems: 'center',
  },
  buttonDone: {
    backgroundColor: '#2D3B36',
    borderRadius: 3,
    // padding: 10,
    paddingHorizontal: 15,
    paddingVertical: 7,
    marginRight: 10,
  },
  buttonDelete: {
    backgroundColor: '#2D2C40',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 7,
  },
  buttonText: {
    color: '#8BF885',
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
  },
  DoneButtonText: {
    color: '#8BF885',
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
  },
  DeleteButtonText: {
    color: '#9683F6',
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
  },
  header: {
    paddingHorizontal: 20,
    backgroundColor: '#101115',
    paddingTop: 30,
    paddingBottom: 10,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontFamily: 'Poppins-Medium',
    color: 'white',
  },
});
