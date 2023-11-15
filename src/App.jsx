import { useState , useRef, useEffect } from 'react'
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Paragraph from '@editorjs/paragraph';
import Quote from "@editorjs/quote";
import Warning from "@editorjs/warning";
import Delimiter from "@editorjs/delimiter";
import Alert from 'editorjs-alert';
//import Header from 'editorjs-header-with-alignment';
import ToggleBlock from 'editorjs-toggle-block';
import List from "@editorjs/list";
import NestedList from '@editorjs/nested-list';
import Checklist from '@editorjs/checklist'
import editorjsNestedChecklist from '@calumk/editorjs-nested-checklist';
import Table from '@editorjs/table'
import CodeTool from '@editorjs/code'
import Marker from '@editorjs/marker'
import InlineCode from '@editorjs/inline-code'
import SimpleImage from '@editorjs/simple-image'
import RawTool from "@editorjs/raw";

function App() {

  const editorInstance = useRef();

  const myEditor = () => {

    const editor = new EditorJS({
      holder : 'editorjs',
      placeholder: 'Let`s write an awesome story!',
      logLevel: 'ERROR',
      inlineToolbar: true,
      onReady : () => {
        editorInstance.current = editor;
      },
      autofocus : true,
      onChange : async () => {
        let content = await editor.saver.save();
        console.log(content);
      },
      tools: {
        header: {
          class: Header,
          config: {
            placeholder: 'Enter a header',
            levels: [1, 2, 3, 4, 5, 6],
            defaultLevel: 1,
          }
        },
        paragraph : {
          class: Paragraph,
          inlineToolbar: true,
          config: {
            placeholder: 'Let`s write an awesome story!',
          },
          autofocus : true
        },
        quote: {
          class: Quote,
          inlineToolbar: true,
          shortcut: 'CMD+SHIFT+O',
          config: {
            quotePlaceholder: 'Enter a quote',
            captionPlaceholder: 'Quote\'s author',
          },
        },
        warning: {
          class: Warning,
          inlineToolbar: true,
          shortcut: 'CMD+SHIFT+W',
          config: {
            titlePlaceholder: 'Title',
            messagePlaceholder: 'Message',
          },
        },
        delimiter: Delimiter,
        alert: {
          class: Alert,
          inlineToolbar: true,
          shortcut: 'CMD+SHIFT+A',
          config: {
            defaultType: 'primary',
            messagePlaceholder: 'Enter something',
          },
        },
        toggle: {
          class: ToggleBlock,
          inlineToolbar: true,
        },
  
        list: {
          class: NestedList,
          inlineToolbar: true,
          config: {
            defaultStyle: 'unordered'
          },
        },
  
        checklist: {
          class: Checklist,
          inlineToolbar: true,
        },
  
        nestedchecklist : editorjsNestedChecklist,
  
        table: {
          class: Table,
          inlineToolbar: true,
          config: {
            rows: 2,
            cols: 3,
            withHeadings : true,
          },
        },

        code: CodeTool,

        Marker: {
          class: Marker,
          shortcut: 'CMD+SHIFT+M',
        },
        inlineCode: {
          class: InlineCode,
          shortcut: 'CMD+SHIFT+M',
        },

        image: { 
          class: SimpleImage, 
          inlineToolbar: true 
        },
      },
    });

  }

  useEffect( () => {
    if(editorInstance.current === null)
    {
      myEditor();
    }

    return () => {
      editorInstance.current = null;
    }
  },[])

  const handleSave = () => {
    // Check if the editor instance exists before attempting to save
    if (editorInstance.current) {
      editorInstance.current
        .save()
        .then((outputData) => {
          console.log('Article data: ', outputData);
        })
        .catch((error) => {
          console.log('Saving failed: ', error);
        });
    } else {
      console.error('Editor instance not available');
    }
  };


  return (
    <div className='bg-white w-auto h-[100vh] text-black mt-9'>
    <div id="editorjs">

    </div>
    <button onClick={handleSave}>Save</button>
    </div>
  )
}

export default App
