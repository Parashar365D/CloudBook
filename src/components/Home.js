import React, { useEffect } from 'react';
import Notes from './Notes';

export default function Home(props) {
    const {setProgress,showAlert} = props;
    useEffect(() => {
        setProgress(100); // Use setProgress here
      }, [setProgress]);
    return (
        <div>
            <Notes setProgress={setProgress} showAlert={showAlert}/>
        </div>
    );
}
