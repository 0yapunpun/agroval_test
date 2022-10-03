import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function Sidebar({
  searchFilter,
  comparing,
  setStateComparing,
  countryFilter,
  setCountryFilter,
  clearFilter,
  applyFilter,
}) {
  let btnShowCompare = (comparing) => {
    if (!comparing) {
      return (
        <span className="text-lg text-gray-700 dark:text-gray-400 font-medium line-through">
          <button
            disabled
            onClick={() => setStateComparing(false)}
            type="button"
            className="disabledBtn text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Compare Selected Items
          </button>
        </span>
      );
    }
    return (
      <span className="text-lg text-gray-700 dark:text-gray-400 font-medium line-through">
        <button
          onClick={() => setStateComparing(false)}
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Compare Selected Items
        </button>
      </span>
    );
  };

  let handleCheckBoxFilter = (e) => {
    if (e.target.checked) {
      setCountryFilter('add', e.target.getAttribute('data-string'));
    } else {
      setCountryFilter('remove', e.target.getAttribute('data-string'));
    }
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-[25vw] flex flex-col bg-white dark:bg-gray-900 shadow-lg p-5 pt-15">
      <p className="text-2xl font-normal text-gray-900 dark:text-white mb-5 italic">Filters</p>
      <div>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
        >
          Search
        </label>
        <div className="relative">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <FontAwesomeIcon icon={faSearch} className="text-gray-100" />
          </div>
          <input
            type="search"
            id="default-search"
            placeholder="Search "
            onChange={(e) => searchFilter(e.target.value)}
            className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>

      <hr className="my-8 h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>

      <div>
        {/* This funcionality has some bugs yet */}
        <h3 className="mb-3 text-1xl font-bold tracking-tight text-gray-900 dark:text-white">
          Country of Origin
        </h3>
        <div>
          {countryFilter.length != 0
            ? countryFilter.map((string, i) => (
                <div key={i} className="flex items-center mb-4 ml-2">
                  <input
                    onChange={handleCheckBoxFilter}
                    data-string={string}
                    type="checkbox"
                    value=""
                    className="checkboxFilterCountry w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="default-checkbox"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    {string}
                  </label>
                </div>
              ))
            : null}
        </div>

        <div className="mt-2 flex justify-center align-center">
          <span className="text-lg text-gray-700 dark:text-gray-400 font-medium line-through">
            <button
              onClick={() => applyFilter()}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Apply Filters
            </button>

            <button
              onClick={() => clearFilter()}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Clear Filters
            </button>
          </span>
        </div>
      </div>

      <hr className="my-8 h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>

      <div className="mx-auto mt-5 ">{btnShowCompare(comparing)}</div>
    </div>
  );
}

export default Sidebar;
