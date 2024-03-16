import { useEffect, useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Box, colors } from '@mui/material';
import styled from '@emotion/styled';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';
import { background } from '@chakra-ui/react';

const Component = styled.div`
   
`;

const Editor = () => {
    const [socket, setSocket] = useState(null);
    const [quill, setQuill] = useState(null);
    const [value, setValue] = useState('');
    const { id } = useParams();

    useEffect(() => {
        const socketServer = io('http://localhost:8000');
        setSocket(socketServer);

        return () => {
            socketServer.disconnect();
        };
    }, []);

    useEffect(() => {
        if (quill === null || socket === null) return;

        socket.once('load-document', document => {
            setValue(document);
        });

        socket.emit('get-document', id);
    }, [quill, socket, id]);

    useEffect(() => {
        if (socket === null || quill === null) return;

        const handleChange = (delta) => {
            setQuill(delta);
        }

        socket && socket.on('receive-changes', handleChange);

        return () => {
            socket && socket.off('receive-changes', handleChange);
        }
    }, [quill, socket]);

    useEffect(() => {
        if (quill === null || socket === null) return;

        const interval = setInterval(() => {
            const content = quill.getEditorContents();
            socket.emit('save-document', content);
        }, 3000);

        return () => {
            clearInterval(interval);
        };
    }, [quill, socket]);

    const handleChange = (content, delta, source, editor) => {
       console.log(delta)
        if (source === 'user') {
            
            socket.emit('send-changes', delta);
        }
    };
    const modules = {
        toolbar: {
            container: [
                [{ font: [] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ script:  "sub" }, { script:  "super" }],
        ["blockquote", "code-block"],
        [{ list:  "ordered" }, { list:  "bullet" }],
        ["link", "image", "video"],
        ["clean"],
            ],
           
        },
    };

    const formats = [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
        'color',
        'background',
        'font',
        'align',
        'clean',
    ];

    return (
        <Component>
            <ReactQuill class="container" id="container"
                 value={value}
                 onChange={handleChange}
                 ref={(ref) => setQuill(ref)}
                modules={modules}
                formats={formats}
                placeholder='Please type here'
          
            />
           
        </Component>
    );

}

export default Editor;
