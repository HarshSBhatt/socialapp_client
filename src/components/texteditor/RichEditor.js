import React from 'react'
import { Editor } from '@tinymce/tinymce-react';

function RichEditor() {
    const handleEditorChange = (content, editor) => {
        console.log('Content: ' + content)
    }
    return (
        <Editor
            apiKey="x08hlvaea8aacavm8d1b1yaax1z4g5ahd9qo2m7k2eucju1b"
            initialValue="<p>This is the initial content of the editor</p>"
            init={{
                height: 500,
                plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount'
                ],
                toolbar: [
                    {
                        name: 'history', items: ['undo', 'redo']
                    },
                    {
                        name: 'styles', items: ['styleselect']
                    },
                    {
                        name: 'formatting', items: ['bold', 'italic', 'backcolor', 'fontcolor']
                    },
                    {
                        name: 'alignment', items: ['alignleft', 'aligncenter', 'alignright', 'alignjustify']
                    },
                    {
                        name: 'indentation', items: ['bullist', 'numlist', 'outdent', 'indent']
                    },
                    {
                        name: 'removeformat', items: ['removeformat', 'table']
                    },
                    {
                        name: 'misc', items: ['wordcount', 'format']
                    },
                    {
                        name: 'help', items: ['help']
                    }
                ]
            }}
            onEditorChange={(contet, editor) => handleEditorChange(contet, editor)}
        />
    )
}

export default RichEditor;
