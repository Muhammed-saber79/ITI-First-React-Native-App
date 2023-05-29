import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [filter, setfilter] = useState('All');
  const [DATA, setData ] = useState([
    {
      id: 1,
      taskName: "one",
      taskDescription: "this is the first task.",
      status: "active"
    },
    {
      id: 2,
      taskName: "two",
      taskDescription: "this is the second task.",
      status: "done"
    },
    {
      id: 3,
      taskName: "three",
      taskDescription: "this is the third task.",
      status: "done"
    },
  ]);

  // Handle task name input...
  const handleTaskName = (e)=>{
    setTaskName(e.target.value);
  }

  // Handle task description input...
  const handleTaskDescription = (e)=>{
    setTaskDescription(e.target.value);
  }

  // Handle submit button...
  const handleSubmit = ()=>{
    const newTask = {
      id: DATA.length + 1,
      taskName: taskName,
      taskDescription: taskDescription,
    }

    setData([
      ...DATA,
      newTask,
    ])
    setTaskName("");
    setTaskDescription("");
  }


  
  const Item = (title) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );


  const handleDone = (id)=>{
    setData((oldData)=>
      oldData.map( (item)=>
        item.id === id && item.status !== 'done' ? {...item, status: 'done'} : item
       )
    )
  }

  const handleAllBtn = (id)=>{
    setData((oldData)=>
      oldData.map( (item)=>
        item.id === id && item.status !== 'done' ? {...item, status: 'done'} : item
       )
    )
  }

  const filtered = DATA.filter( (item)=> {
    if(filter == 'All'){
      return true;
    }else if(filter == 'Active'){
      return item.status === 'active';
    }else if(filter == 'Done'){
      return item.status === 'done'
    }
  })

  return (
    <SafeAreaView style={styles.container}>
      <Text style={ styles.title }>TODO APP</Text>

      <TextInput
        placeholder='Enter task name...'
        style={ styles.input }
        value={ taskName }
        onChange={handleTaskName}
      ></TextInput>
      <TextInput
        placeholder='Enter task description...'
        style={ styles.input }
        value={ taskDescription }
        onChange={handleTaskDescription}
      ></TextInput>

      <TouchableOpacity onPress={ handleSubmit }>
        <View style={ styles.button }>
          <Text style={ styles.buttonText }>Submit</Text>
        </View>
      </TouchableOpacity>

      <View style={ styles.content }>
        <View style={ styles.btns }>
          <TouchableOpacity onPress={ ()=>setfilter('All') }>
            <View style={ styles.AllBtn }>
              <Text style={ styles.buttonText }>All</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={ ()=>setfilter('Active') }>
            <View style={ styles.ActiveBtn }>
              <Text style={ styles.buttonText }>Active</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={ ()=>setfilter('Done') }>
            <View style={ styles.donBtn }>
              <Text style={ styles.buttonText }>Done</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Text>Content...!</Text>
        <FlatList
          data={filtered}
          renderItem={({item}) => 
                      <View style={ item.status === 'done' ? styles.done : styles.row }>
                        <Text>{ item.taskName }</Text>
                        <Text>{ item.taskDescription }</Text>
                        <TouchableOpacity onPress={ ()=> handleDone(item.id) }>
                          <View style={ styles.donBtn }>
                            <Text style={ styles.buttonText }>{ item.status === 'done' ? 'Done' : 'Mark as Done' }</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    }
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 24,
  },
  input: {
    height: 40,
    borderColor: "lightgreen",
    borderRadius: "10px",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 15,
    color: 'grey'
  },
  button: {
    backgroundColor: "lightgreen",
    padding: "10px",
    borderRadius: "10px"
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: 'bold'
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "lightgreen",
    borderRadius: "10px",
    padding: 15,
    width: "90%",
    overflow: "hidden",
  },
  row: {
    flex: 1,
    justifyContent: 'center',
    alignContent: "center",
    backgroundColor: "lightblue",
    marginTop: 16,
    marginBottom: 16,
    padding: 15,
    borderWidth: 1,
    borderColor: "blue",
    borderRadius: "10px",
  },
  done: {
    flex: 1,
    justifyContent: 'center',
    alignContent: "center",
    backgroundColor: "lightgreen",
    marginTop: 16,
    marginBottom: 16,
    padding: 15,
    borderWidth: 1,
    borderColor: "blue",
    borderRadius: "10px",
  },
  donBtn: {
    backgroundColor: "#4942E4",
    padding: "10px",
    borderRadius: "10px",
    marginTop: 5,
    marginBottom: 5,
  },
  AllBtn: {
    backgroundColor: "lightblue",
    padding: "10px",
    borderRadius: "10px",
    marginTop: 5,
    marginBottom: 5,
  },
  ActiveBtn: {
    backgroundColor: "lightgreen",
    padding: "10px",
    borderRadius: "10px",
    margin: 5
  },
  btns: {
    flexDirection: "row",
  }
});
