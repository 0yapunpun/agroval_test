import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

function Modal({ showModal, setStateModal, listToCompare }) {
  let formatPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  let elementCompare = (index, obj) => {
    return (
      <div
        key={index}
        className="flex flex-col overflow-y-hidden border mx-1 border-gray-500 max-w-[250px] min-w-[250px] max-h-[450px]  h-[450px]"
      >
        <div className="max-w-[300px] max-h-[150px] min-h-[130px] h-[130px] overflow-hidden">
          <img src={obj.imgP} alt="" className="object-cover" />
        </div>
        <dl className="flex flex-col  mx-auto  text-gray-900   dark:text-white sm:p-3">
          <div className="flex flex-col justify-center items-center mb-2">
            <dt className=" text-1xl font-extrabold text-center">{obj.title}</dt>
            <dd className="font-light text-gray-500 dark:text-gray-400">Name</dd>
          </div>
          <div className="flex flex-col justify-center items-center mb-2">
            <dt className="text-1xl font-extrabold">
              {obj.promo
                ? formatPrice.format(obj.specialPrice) + ' $'
                : formatPrice.format(obj.productPrice) + ' $'}
            </dt>
            <dd className="font-light text-gray-500 dark:text-gray-400">Price</dd>
          </div>
          <div className="flex flex-col justify-center items-center mb-2">
            <dt className=" text-1xl font-extrabold">{obj.countryofOrigin.label}</dt>
            <dd className="font-light text-gray-500 dark:text-gray-400">Country of origin</dd>
          </div>
          <div className="flex flex-col justify-center items-center mb-2">
            <dt className=" text-1xl font-extrabold">{obj.quantityAvailable}</dt>
            <dd className="font-light text-gray-500 dark:text-gray-400">Quantity Available </dd>
          </div>
          <div className="flex flex-col justify-center items-center mb-2">
            <dt className="text-1xl font-extrabold">{obj.minimumQuantityAvailable}</dt>
            <dd className="font-light text-gray-500 dark:text-gray-400">
              Minimum quantity available{' '}
            </dd>
          </div>
        </dl>
      </div>
    );
  };

  return (
    <div
      id="defaultModal"
      tabIndex="-1"
      aria-hidden="true"
      className={`${
        showModal ? 'showModal' : 'hideModal'
      } modalBackdrop overflow-y-auto overflow-x-hidden fixed inset-x-0 mx-auto z-50 w-full md:inset-0 h-modal md:h-full`}
    >
      <div className="relative p-4 w-full max-w-4xl h-full flex">
        <div className="relative mb-3 bg-white rounded-lg shadow dark:bg-gray-700 w-full">
          <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Compare Products
            </h3>
            <button
              type="button"
              onClick={() => setStateModal(false)}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="defaultModal"
            >
              <FontAwesomeIcon icon={faClose} />
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div
            id="compareContainer"
            className="flex overflow-x-auto gap-3  m-6 justify-center pb-2"
          >
            {listToCompare ? (
              listToCompare.map((product, i) => elementCompare(i, product))
            ) : (
              <div> </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
