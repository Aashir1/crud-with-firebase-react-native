import React from 'react';
import { View, Text, StyleSheet, TextInput, Platform, FlatList, TouchableOpacity, Alert } from 'react-native';
import firebase from './firebase';
const refrence = firebase.database().ref('/todos/')
export default class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todoText: '',
            flowers: [{ name: 'lily' }, { name: 'lily' }, { name: 'lily' }, { name: 'lily' }, { name: 'lily' }, { name: 'lily' }, { name: 'lily' }],
            todos: [],
            updata: false,
            id: '',
        }
    }
    _onChangeText = (value) => {
        this.setState({ todoText: value });
    }
    componentDidMount() {
        refrence.on('child_added', datasnapshot => {
            let obj = {
                key: datasnapshot.key,
                todo: datasnapshot.val().data,
            }
            this.setState({ todos: [...this.state.todos, obj] });
        });
        refrence.on('child_removed', datasnapshot => {
            let todos = this.state.todos.filter(data => data.key !== datasnapshot.key);
            this.setState({ todos });
        });
        refrence.on('child_changed', datasnapshot => {
            let todoClone = this.state.todos;
            let tempArray = todoClone.map((data, i) => {
                if (data.key === datasnapshot.key) {
                    return {
                        key: datasnapshot.key,
                        todo: datasnapshot.val().data,
                    }
                }
                return {
                    key: data.key,
                    todo: data.todo
                }
            })
            this.setState({ todos: tempArray, todoText: '' });
        })

    }
    _onSubmit = () => {
        if (this.state.update) {
            refrence.child(`${this.state.id}`).update({ data: this.state.todoText });
            this.setState({ update: false });
        } else {
            if (this.state.todoText.trim() !== "") {
                refrence.push({ data: this.state.todoText });
                this.setState({ todoText: '' });
            }
        }
    }
    _deleteTodo = (key) => {
        refrence.child(key).remove();
    }
    _editTodo = (key, data) => {
        console.log(data);
        this.setState({ todoText: data, update: true, id: key });
    }

    render() {
        let { params } = this.props.navigation.state;
        let name = params ? params.name : null;
        return (
            <View style={{ flex: 1 }}>
                <Text>
                    Welcome {` ${name}`}
                </Text>
                <TextInput
                    style={{ height: Platform.OS == 'android' ? 70 : 20 }}
                    onChangeText={this._onChangeText}
                    placeholder="Enter Todos"
                    value={this.state.todoText}
                    onSubmitEditing={this._onSubmit}
                // underlineColorAndroid='transparent'
                />
                <Text>
                    there will be flatlist
                </Text>
                <FlatList
                    // style={{ height: 100 }}
                    data={this.state.todos}
                    renderItem={
                        ({ item }) => {
                            return (
                                <View style={styles.row}>
                                    <View>
                                        <Text key={item.key} style={styles.item}>{item.todo}</Text>
                                    </View>
                                    <View style={styles.btnWrapper}>
                                        <TouchableOpacity onPress={() => { this._deleteTodo(item.key) }}>
                                            <Text>Delete</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => { this._editTodo(item.key, item.todo) }}>
                                            <Text>Edit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        }
                    }
                />
                {/* <FlatList
                    data={[
                        { key: 'Devin' },
                        { key: 'Jackson' },
                        { key: 'James' },
                        { key: 'Joel' },
                        { key: 'John' },
                        { key: 'Jillian' },
                        { key: 'Jimmy' },
                        { key: 'Julie' },
                    ]}
                    renderItem={({ item }) => <Text style={styles.item}>{item.key}</Text>}
                /> */}
                <Text>
                    there will be flatlist
                </Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    heading: {
        fontSize: 30,
        justifyContent: 'center',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    row: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    btnWrapper: {
        justifyContent: 'space-between',
        flexDirection: 'row',
    }
})