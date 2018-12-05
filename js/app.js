"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var VashiCheckout =
/*#__PURE__*/
function () {
  function VashiCheckout() {
    _classCallCheck(this, VashiCheckout);

    this.loadingOverlay = document.querySelector('.loading-overlay');
    this.addressToggles = document.querySelectorAll('.input-different-shipping input[type="radio"]');
    this.init();
  }

  _createClass(VashiCheckout, [{
    key: "init",
    value: function init() {
      console.log('Vashi Checkout Prototype');
      this.bindAddressToggles();
      this.initTabs();
      this.bindPlaceOrder();
      this.initFancyFields();
    }
  }, {
    key: "initFancyFields",
    value: function initFancyFields() {
      var fields = document.querySelectorAll('.vashi-input');
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        var _loop = function _loop() {
          var field = _step.value;
          field.addEventListener('focusout', function (e) {
            return e.target.value !== "" ? field.classList.add('has-value') : field.classList.remove('has-value');
          });
        };

        for (var _iterator = fields[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          _loop();
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: "bindAddressToggles",
    value: function bindAddressToggles() {
      var _this = this;

      this.addressToggles.forEach(function (radio) {
        radio.addEventListener('change', function (e) {
          if (e.target.id === 'billing:use_different') {
            _this.showLoadingSpinner();

            _this.timeout(1000).then(function () {
              _this.hideLoadingSpinner();

              _this.showShippingAddressSection();

              _this.scrollToSection('.address--shipping');
            }).catch(function () {
              _this.hideLoadingSpinner();

              console.log('Shipping address error');
            });
          } else {
            _this.hideShippingAddressSection();
          }
        });
      });
    }
  }, {
    key: "showLoadingSpinner",
    value: function showLoadingSpinner() {
      this.loadingOverlay.classList.add('loading-overlay--active');
    }
  }, {
    key: "hideLoadingSpinner",
    value: function hideLoadingSpinner() {
      this.loadingOverlay.classList.remove('loading-overlay--active');
    }
  }, {
    key: "showBillingAddressSection",
    value: function showBillingAddressSection() {
      document.querySelector('.address--billing').classList.remove('address--disabled');
    }
  }, {
    key: "scrollToSection",
    value: function scrollToSection(el) {
      document.querySelector(el).scrollIntoView({
        block: 'start',
        behavior: 'smooth'
      });
    }
  }, {
    key: "showShippingAddressSection",
    value: function showShippingAddressSection() {
      document.querySelector('.address--shipping').classList.remove('address--hidden');
      document.querySelector('.address--shipping').classList.remove('address--disabled');
    }
  }, {
    key: "hideShippingAddressSection",
    value: function hideShippingAddressSection() {
      document.querySelector('.address--shipping').classList.add('address--hidden');
    }
  }, {
    key: "initTabs",
    value: function initTabs() {
      var tabs = document.querySelectorAll('.tabs');
      tabs.forEach(function (tab) {
        var tabButton = tab.querySelectorAll('.tab');
        tabButton.forEach(function (tab, i) {
          tab.addEventListener('click', function (e) {
            e.preventDefault();
            setInactivePanels();
            setActivePanel(i, tab);
          });
        });

        function setInactivePanels() {
          var tabButton = tab.querySelectorAll('.tab');
          tabButton.forEach(function (button) {
            button.classList.remove('tab--active');
          });
          var tabContent = tab.querySelectorAll('.tab__content');
          tabContent.forEach(function (tab) {
            tab.classList.remove('tab__content--active');
          });
        }

        function setActivePanel(i, tabButton) {
          var tabContent = tab.querySelectorAll('.tab__content');
          tabContent[i].classList.add('tab__content--active');
          tabButton.classList.add('tab--active');
        }
      });
    }
  }, {
    key: "bindPlaceOrder",
    value: function bindPlaceOrder() {
      var _this2 = this;

      document.querySelector('.place-order').addEventListener('click', function () {
        _this2.showLoadingSpinner();

        _this2.timeout(5000).then(function () {
          _this2.hideLoadingSpinner();
        });
      });
    }
    /**
     * Timeout for spoofing ajax reqs
     * 
     * @param {Number} ms 
     */

  }, {
    key: "timeout",
    value: function timeout(ms) {
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          resolve();
        }, ms);
      });
    }
  }]);

  return VashiCheckout;
}();

new VashiCheckout();