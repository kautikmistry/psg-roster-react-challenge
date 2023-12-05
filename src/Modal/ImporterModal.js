import React, { useContext, useEffect, useRef, useState } from 'react';
import { Modal } from 'semantic-ui-react';
import Papa from 'papaparse';
import { AppContext } from '../Context/AppContext';


const ImporterModal = ({ visible, handleClose }) => {
  const {players, setPlayers} = useContext(AppContext);
  const inputFile = useRef(null)
  const [inputError, setInputError] = useState("")
  const [tableData, setTableData] = useState("")
  const [tempPlayers, setTempPlayers] = useState([]);
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    if (tempPlayers.length > 0) {
      let occurences = tempPlayers.reduce(function (r, row) {
        r[row.Position] = ++r[row.Position] || 1;
        return r;
      }, {});

      let result = Object.keys(occurences).map(function (key) {
        return { key: key, value: occurences[key] };
      });
      setTableData(result);
    }
  }, [tempPlayers])

  const handleFileRead = (content) => {
    if (content.includes(",,")) {
      setTableData("")
      setInputError(true)
      return;
    }
    try {
      // const content = fileReader.result;
      Papa.parse(content, {
        header: true,
        dynamicTyping: true,
        complete(results) {
          setTempPlayers(results.data);
        },
      });
      // eslint-disable-next-line no-empty
    } catch (e) { }
  }

  const handleOnChangeFile = (event) => {
    setFileName(event.target.value.split("\\").pop())
    setInputError(false)
    event.stopPropagation();
    event.preventDefault();
    if (event.target.files[0]) {
      const fileReader = new FileReader();
      fileReader.onloadend = () => handleFileRead(fileReader.result);
      fileReader.readAsText(event.target.files[0]);
    }
  }

  const onButtonClick = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
  };

  return (
    <Modal open={visible} className='rounded-l'>
      <div className="shadow-lg bg-zinc-800 flex flex-col items-stretch rounded-lg">
        <div className="flex w-full flex-col mt-6 px-6 max-md:max-w-full max-md:px-5">
          <div className="self-stretch flex justify-between gap-5 max-md:max-w-full max-md:flex-wrap">
            <div className="text-stone-50 text-lg font-semibold leading-7">
              Importer
            </div>
            <div className="text-stone-300 text-base font-black leading-4 whitespace-nowrap" onClick={handleClose}>
              <i className="fa-solid fa-close text-[18px]"></i>
            </div>
          </div>
          <div className="bg-zinc-700 self-stretch shrink-0 h-px mt-4 max-md:max-w-full" />
          <div className="text-stone-50 text-sm font-medium leading-5 self-stretch whitespace-nowrap mt-7 max-md:max-w-full">
            Roster File
          </div>
          <div className="items-center border border-[color:var(--borders-default,#494949)] flex w-[300px] max-w-full justify-between gap-5 mt-3.5 pl-4 rounded-lg border-solid self-start">
            <div className="text-neutral-400 text-sm leading-5 flex-1 my-auto">
              {fileName || 'No file selected'}
            </div>
            <div onClick={onButtonClick} className="text-stone-300 text-sm font-medium leading-5 whitespace-nowrap justify-center items-stretch border border-[color:var(--borders-default,#494949)] self-stretch px-5 py-3 rounded-lg border-solid">
              Select File
              <input type="file" id="file" accept=".csv" ref={inputFile} style={{ display: "none" }} onChange={(e) => handleOnChangeFile(e)} />
            </div>
          </div>
          {
            inputError ?
              <>
                <div className="text-red-600 text-sm font-medium leading-5 self-stretch whitespace-nowrap mt-5 max-md:max-w-full">
                  Error
                </div>
                <div className="text-stone-300 text-sm leading-5 self-stretch whitespace-nowrap mt-5 max-md:max-w-full">
                  Your sheet is missing data. Please ensure all cells are filled out.
                </div>
              </> :
              <div className="text-neutral-400 text-sm leading-5 self-stretch whitespace-nowrap mt-5 max-md:max-w-full">
                File must be in .csv format
              </div>
          }
          {tableData && <>
            <div className="text-stone-50 text-sm font-medium leading-5 self-stretch whitespace-nowrap mt-11 max-md:max-w-full max-md:mt-10">File Summary</div>
            <div className="items-stretch self-stretch flex justify-between gap-5 mt-7 pr-20 max-md:max-w-full max-md:flex-wrap max-md:pr-5">
              <div className="items-stretch flex grow basis-[0%] flex-col">
                <div className="text-stone-300 text-sm leading-5 whitespace-nowrap">Total Players</div>
                <div className="text-stone-300 text-base font-semibold leading-6 whitespace-nowrap mt-2">{tempPlayers.length}</div>
              </div>
              <div className="items-stretch flex grow basis-[0%] flex-col">
                <div className="text-stone-300 text-sm leading-5 whitespace-nowrap">Goalkeepers</div>
                <div className="text-stone-300 text-base font-semibold leading-6 whitespace-nowrap mt-2">{tableData.find((ele) => ele.key === 'Goalkeeper').value}</div>
              </div>
              <div className="items-stretch flex grow basis-[0%] flex-col">
                <div className="text-stone-300 text-sm leading-5 whitespace-nowrap">Defenders</div>
                <div className="text-stone-300 text-base font-semibold leading-6 whitespace-nowrap mt-2">{tableData.find((ele) => ele.key === 'Defender').value}</div>
              </div>
              <div className="items-stretch flex grow basis-[0%] flex-col">
                <div className="text-stone-300 text-sm leading-5 whitespace-nowrap">Midfielders</div>
                <div className="text-stone-300 text-base font-semibold leading-6 whitespace-nowrap mt-2">{tableData.find((ele) => ele.key === 'Midfielder').value}</div>
              </div>
              <div className="items-stretch flex grow basis-[0%] flex-col">
                <div className="text-stone-300 text-sm leading-5 whitespace-nowrap">Forwards</div>
                <div className="text-stone-300 text-base font-semibold leading-6 whitespace-nowrap mt-2">{tableData.find((ele) => ele.key === 'Forward').value}</div>
              </div>
            </div>
          </>
          }
        </div>

        <button {...(tempPlayers.length > 0 ? { onClick: () => { setPlayers(tempPlayers); handleClose() } } : {})} className={`text-sm font-medium leading-5 whitespace-nowrap justify-center items-stretch w-[88px] max-w-full mr-6 mt-80 mb-6 px-5 py-3 rounded-lg self-end max-md:mr-2.5 max-md:mt-10 ${tempPlayers.length == 0 ? 'text-neutral-500 bg-zinc-800' : 'text-stone-50 bg-amber-500'}`}>
          Import
        </button>
      </div>
    </Modal>
  )
}

export default ImporterModal