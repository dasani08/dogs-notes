import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Link, Redirect, useParams, withRouter } from 'react-router-dom';
import store from 'store';
import firebase from './firebase';

import './App.css';
import Header from './components/Header';

function Login() {
  const [isLogged, setIsLogged] = useState(false);
  const doLogin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        store.set('isLogged', true);
        setIsLogged(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    if (!store.get('isLogged')) {
      doLogin();
    }
  });

  return isLogged ? <Redirect to="/" /> : <>login</>;
}

function PrivateRoute({ component: Component, ...rest }: any) {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    setIsLogged(store.get('isLogged') || false);
  }, []);

  return (
    <Route
      {...rest}
      render={(props) =>
        store.get('isLogged') || false ? (
          <Component {...props} />
        ) : (
          <Login></Login>
        )
      }
    ></Route>
  );
}

function Note(props: any) {
  return (
    <div {...props} className="notes__item" key={props.id}>
      <h5 className="notes__title">{props.title}</h5>
      <p className="notes__body">{props.body}</p>
    </div>
  );
}

const Notes = withRouter((props: any) => {
  const [notes, setNotes] = useState<any[]>([]);

  const gotoDetail = (id: string) => () => {
    console.log(id);
    props.history.push(`/notes/${id}`);
  };

  useEffect(() => {
    const notesRef = firebase.firestore().collection('notes');
    notesRef.get().then((notes) => {
      const mappedNotes = notes.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setNotes(mappedNotes as any);
    });
  }, []);

  return (
    <div className="notes">
      {notes.map((note) => (
        <Note onClick={gotoDetail(note.id)} key={note.id} {...note} />
      ))}
    </div>
  );
});

function Editor(props: any) {
  useEffect(() => {
    let SimpleMDE;
    if ((window as any).SimpleMDE) {
      SimpleMDE = (window as any).SimpleMDE;
      const editor = new SimpleMDE({
        autofocus: true,
        autosave: {
          enabled: true,
          delay: 3000,
          uniqueId: 'editor',
        },
        toolbar: false,
        status: false,
      });
      editor.codemirror.on('change', function () {
        if (props.onChanged && typeof props.onChanged === 'function') {
          props.onChanged(editor.value());
        }
      });
    }
  });

  return (
    <div>
      <textarea defaultValue={props.content} />
    </div>
  );
}

function DetailNote() {
  const { id } = useParams();
  const [note, setNote] = useState<any>(null);
  let tmpNotes: string = '';

  const saveNote = () => {
    if (tmpNotes.trim() === '') {
      return;
    }
    firebase
      .firestore()
      .collection('notes')
      .doc(id)
      .set(
        {
          body: tmpNotes,
        },
        { merge: true }
      )
      .catch((error) => {
        alert(`Error writing note: ${error}`);
      });
  };

  const onChanged = (value: string) => {
    tmpNotes = value;
  };

  useEffect(() => {
    const noteRef = firebase.firestore().collection('notes').doc(id);
    noteRef.get().then((note) => {
      setNote({
        id: note.id,
        ...note.data(),
      });
    });
  }, [id]);

  return (
    <div>
      {note ? (
        <>
          <button onClick={saveNote}>Done</button>
          <Editor onChanged={onChanged} content={note.body}></Editor>
        </>
      ) : (
        ''
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <PrivateRoute exact path="/" component={Notes} />
          <PrivateRoute path="/notes/:id" component={DetailNote} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
