import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCartShopping, faCodeCompare } from '@fortawesome/free-solid-svg-icons';

function Card({ product, comparing, setStateComparing, handleCompareCheckbox }) {
  let formatPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  let handleFavoriteClick = (e) => {
    if (e.currentTarget.classList.contains('heartActive')) {
      e.currentTarget.classList.remove('heartActive');
      e.currentTarget.classList.add('heartNormal');
    } else {
      e.currentTarget.classList.remove('heartNormal');
      e.currentTarget.classList.add('heartActive');
    }
  };

  let discountTag = (show, price, pricePromo) => {
    if (show) {
      let discountPercentage = (100 * pricePromo) / price - 100;
      return (
        <div className="absolute top-[-30px] left-[-30px] h-[55px] w-[55px] rounded-full flex items-center justify-center text-sm font-bold bg-red-600 text-gray-100">
          {discountPercentage.toFixed(1)}%
        </div>
      );
    }
  };

  let favoriteTag = (show) => {
    if (show) {
      return (
        <div className="absolute top-0 right-0 p-4">
          <FontAwesomeIcon
            icon={faHeart}
            className="text-2xl transition-all cursor-pointer heartActive"
            onClick={handleFavoriteClick}
          />
        </div>
      );
    }
    return (
      <div className="absolute top-0 right-0 p-4 ">
        <FontAwesomeIcon
          icon={faHeart}
          className=" text-2xl transition-all cursor-pointer heartNormal"
          onClick={handleFavoriteClick}
        />
      </div>
    );
  };

  let normalPrice = (show, price) => {
    if (show) {
      return (
        <span className="text-lg text-gray-700 dark:text-gray-400 font-medium line-through">
          {formatPrice.format(price || 0)} USD
        </span>
      );
    }
  };

  let currentPrice = (isPromo, price, pricePromo) => {
    if (!isPromo) {
      return (
        <span className="text-2xl font-bold text-gray-100">
          {formatPrice.format(price || 0)} USD
        </span>
      );
    }
    return (
      <span className="text-2xl font-bold text-red-600">
        {formatPrice.format(pricePromo || 0)} USD
      </span>
    );
  };

  let stateCompare = (comparing, hasCountryOrigin) => {
    if (hasCountryOrigin == undefined) {
      return;
    }

    if (!comparing) {
      return (
        <div
          onClick={() => setStateComparing(true)}
          className="flex gap-3 absolute bottom-0 right-0 p-3"
        >
          <a
            href="#"
            className="inline-flex gap-3 items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Compare
            <FontAwesomeIcon icon={faCodeCompare} />
          </a>
        </div>
      );
    }
    return (
      <div className="absolute bottom-0 right-0 p-3">
        <div className="flex items-center">
          <input
            onChange={handleCheckBox}
            id="checked-checkbox"
            type="checkbox"
            value=""
            className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />

          <label
            htmlFor="checked-checkbox"
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Compare
          </label>
        </div>
      </div>
    );
  };

  let handleCheckBox = (e) => {
    if (e.target.checked) {
      handleCompareCheckbox('add', product);
    } else {
      handleCompareCheckbox('remove', product);
    }
  };

  return (
    <div
      className="relative max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700
                  hover:relative top-[10px] "
    >
      <a href="#">
        <img className="rounded-t-lg" src={product.imgP} alt="" />
      </a>

      <div className="h-[320px] p-5 ">
        <div>
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {product.title}
            </h5>
          </a>

          <p className="whitespace-nowrap overflow-hidden text-ellipsis mb-3 font-normal text-gray-700 dark:text-gray-400">
            {product.description}
          </p>

          <div className="pb-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-1 mb-1">
              {product.category}
            </span>
          </div>

          <div className="flex flex-col flex-initial">
            {currentPrice(product.promo, product.productPrice, product.specialPrice)}
            {normalPrice(product.promo, product.productPrice)}
          </div>

          {discountTag(product.promo, product.productPrice, product.specialPrice)}

          {favoriteTag(product.favorite)}
        </div>

        <div className="flex gap-3 absolute bottom-0 left-0 p-3">
          <a
            href="#"
            className="inline-flex gap-3 items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add Cart
            <FontAwesomeIcon icon={faCartShopping} />
          </a>
        </div>

        {stateCompare(comparing, product.countryofOrigin)}
      </div>
    </div>
  );
}

export default Card;
