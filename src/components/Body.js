import React, { useState, useEffect } from 'react';

import Card from './Card';
import Sidebar from './Sidebar';
import Pagination from './Pagination';
import Modal from './Modal';

const api_url = 'https://testing-agriglobal-market.ue.r.appspot.com/api/getproducts/admisiones';

function Body() {
  const [state, setState] = useState({
    list: [],
    slicedList: [],
    pagesArray: [],
    compareList: [],
    countryFilterList: [],
    selectedCountryList: [],
    currentPage: 1,
    comparing: false,
    showModal: false,
  });

  const getData = async () => {
    let rawResponse = await fetch(api_url);
    let response = await rawResponse.json();

    console.log(response);

    if (response.ok) {
      let arrayOperation = prepareArrayProducts(response.products, 6);
      setState({
        ...state,
        list: response.products,
        slicedList: arrayOperation[0],
        pagesArray: arrayOperation[1],
        countryFilterList: arrayOperation[2],
      });
    }
  };

  const setCurrentPage = (newCurrentPage) => {
    setState({ ...state, currentPage: newCurrentPage });
  };

  // Prepare list of products, divide array in parts to pogination
  const prepareArrayProducts = (array, chunkSize) => {
    let newArray = [];
    let pagesArray = [];
    let arrayFilters = [];

    // Array of
    for (let i = 0; i < array.length; i += chunkSize) {
      newArray.push(array.slice(i, i + chunkSize));
    }

    // Array of pages
    for (let i = 0; i < newArray.length; i++) {
      pagesArray.push(i + 1);
    }

    // List of countries
    for (let i = 0; i < array.length; i++) {
      try {
        if (arrayFilters.findIndex((string) => string == array[i].countryofOrigin.label) == -1) {
          arrayFilters.push(array[i].countryofOrigin.label);
        }
      } catch (error) {}
    }

    return [newArray, pagesArray, arrayFilters];
  };

  function searchFilter(string) {
    // Reload state on empty field
    if (string == '') {
      let arrayOperation = prepareArrayProducts(state.list, 6);
      return setState({
        ...state,
        slicedList: arrayOperation[0],
        pagesArray: arrayOperation[1],
        countryFilterList: arrayOperation[2],
      });
    }

    let filtered = state.list.filter(function (v, i) {
      if (
        v.title.toLowerCase().indexOf(string) >= 0 ||
        v.description.toLowerCase().indexOf(string) >= 0 ||
        v.category.toLowerCase().indexOf(string) >= 0 ||
        v.subCategory.toLowerCase().indexOf(string) >= 0
      ) {
        return true;
      }
    });

    if (filtered.length != 0) {
      let arrayOperation = prepareArrayProducts(filtered, 6);
      setState({
        ...state,
        slicedList: arrayOperation[0],
        pagesArray: arrayOperation[1],
        countryFilterList: arrayOperation[2],
      });
    }
  }

  let setStateModal = (stateModal) => {
    setState({
      ...state,
      showModal: stateModal,
    });

    if (!stateModal) {
      setState({
        ...state,
        compareList: [],
        comparing: false,
        showModal: false,
      });
    }
  };

  let setStateComparing = (stateComparing) => {
    setState({
      ...state,
      comparing: stateComparing,
    });

    if (!stateComparing) {
      setState({
        ...state,
        showModal: true,
      });
    }
  };

  let handleCompareCheckbox = (action, obj) => {
    if (action == 'add') {
      let addObj = [...state.compareList];
      addObj.push(obj);
      setState({
        ...state,
        compareList: addObj,
      });
    }

    if (action == 'remove') {
      let removeObj = [...state.compareList];
      removeObj = removeObj.filter((data) => data._id == obj._id);
      setState({
        ...state,
        compareList: removeObj,
      });
    }
  };

  let setCountryFilter = (action, string) => {
    if (action == 'add') {
      let addArray = [...state.selectedCountryList];
      addArray.push(string);
      setState({
        ...state,
        selectedCountryList: addArray,
      });
    }

    if (action == 'remove') {
      let removeArray = [...state.selectedCountryList];
      removeArray = removeArray.filter((e) => e !== string);
      setState({
        ...state,
        selectedCountryList: removeArray,
      });
    }
  };

  let applyFilter = () => {
    let filterList = [...state.selectedCountryList];
    let completeList = [...state.list];
    let filteredList = [];

    for (let i = 0; i < completeList.length; i++) {
      try {
        if (filterList.includes(completeList[i].countryofOrigin.label)) {
          filteredList.push(completeList[i]);
        }
      } catch (error) {}
    }

    let arrayOperation = prepareArrayProducts(filteredList, 6);
    setState({
      ...state,
      slicedList: arrayOperation[0],
      pagesArray: arrayOperation[1],
      countryFilterList: arrayOperation[2],
    });
  };

  let clearFilter = () => {
    let completeList = [...state.list];
    let arrayOperation = prepareArrayProducts(completeList, 6);
    setState({
      ...state,
      slicedList: arrayOperation[0],
      pagesArray: arrayOperation[1],
      countryFilterList: arrayOperation[2],
      selectedCountryList: [],
    });

    let checkboxes = document.querySelectorAll('.checkboxFilterCountry');
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false;
    }
  };

  let showComparedItems = () => {
    setState({
      ...state,
      stateModal: true,
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Sidebar
        searchFilter={searchFilter}
        countryFilter={state.countryFilterList}
        setCountryFilter={setCountryFilter}
        comparing={state.comparing}
        setStateComparing={setStateComparing}
        showComparedItems={showComparedItems}
        clearFilter={clearFilter}
        applyFilter={applyFilter}
      />

      <div
        className="fixed top-0 right-0 h-screen w-[75vw] flex flex-col
                    bg-white dark:bg-gray-900 shadow-lg"
      >
        <div className="overflow-y-auto">
          <div className="grid grid-cols-3 gap-10 p-20 pl-10 pb-10 overflow-y-auto">
            {state.slicedList.length != 0 ? (
              state.slicedList[state.currentPage - 1].map((product, i) => (
                <Card
                  key={i}
                  product={product}
                  comparing={state.comparing}
                  setStateComparing={setStateComparing}
                  handleCompareCheckbox={handleCompareCheckbox}
                />
              ))
            ) : (
              <p className="text-2xl font-normal text-gray-900 dark:text-white mb-5 italic">
                Cargando Items
              </p>
            )}
          </div>

          <div className="flex items-center justify-center mb-10">
            <Pagination
              pages={state.pagesArray}
              currentPage={state.currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      </div>

      <Modal
        showModal={state.showModal}
        setStateModal={setStateModal}
        listToCompare={state.compareList}
      />
    </div>
  );
}

export default Body;
