'use client';

import React, { useCallback, useEffect, useState } from 'react';
import styles from '@/app/sass/components/pricerangeslider.module.scss';
import ArrowIcon from '@/app/components/icons/arrowIcon';
import { Button, Collapse } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/redux/store';
import { getProducts, updateMaxPrice, updateMinPrice } from '@/app/redux/Filterslice';

const PriceRangeSlider = () => {
  const minValue = useSelector((state: RootState) => state.product.minprice);
  const maxValue = useSelector((state: RootState) => state.product.maxprice);
  const category = useSelector((state: RootState) => state.product.currentCategory);
  const minRange = 0;
  const maxRange = 1000000;
  const dispatch: AppDispatch = useDispatch()

  const handleMinChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    if (inputValue === '' || isNaN(Number(inputValue))) {
      dispatch(updateMinPrice(0))
    } else {
      const value = Math.min(Number(event.target.value), maxValue - 1);
      dispatch(updateMinPrice(value))
    }
  },[maxValue, dispatch]);

  const handleMaxChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    if (inputValue === '' || isNaN(Number(inputValue))) {
      dispatch(updateMaxPrice(0))
    } else {
      const value = Math.max(Number(event.target.value), minValue + 1);
      dispatch(updateMaxPrice(value))
    }
  }, [minValue, dispatch]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      dispatch(getProducts(category))

    }, 500)

    return () => clearTimeout(debounceTimer);
  }, [handleMinChange, handleMaxChange, dispatch, category])

  const [open, setOpen] = useState(true);

  return (
    <div className='mt-3'>
      <Button
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
        className="mt-4 w-100 bg-transparent text-capitalize border-transparent-solid text-black font-primary d-flex align-items-center fw-4 justify-content-between p-0"
      >
        Filter by Price
        <ArrowIcon open={open} />
      </Button>
      <Collapse in={open} className='pe-2 pt-3'>
        <div>
          <div className={`d-flex gap-20`}>
            <div className='d-flex gap-8 p-1 wc-50 bg-body2 justify-content-center'>
              <span>₹</span>
              <div>{minValue}</div>
            </div>
            <div className='d-flex gap-8 p-1 wc-50 bg-body2 justify-content-center'>
              <span>₹</span>
              <div>{maxValue}</div>
            </div>
          </div>

          <div className={`${styles.slider} bg-border mt-4 h-5 br-5`}>
            <div
              className={`br-5 bg-theme1 ${styles.progress}`}
              style={{
                left: `${((minValue - minRange) / (maxRange - minRange)) * 100}%`,
                width: `${((maxValue - minValue) / (maxRange - minRange)) * 100}%`,
              }}
            ></div>
            <div className={styles.rangeInput}>
              <input
                type="range"
                min={minRange}
                max={maxRange}
                value={minValue}
                onChange={handleMinChange}
              />
              <input
                type="range"
                min={minRange}
                max={maxRange}
                value={maxValue}
                onChange={handleMaxChange}
              />
            </div>
          </div>
        </div>

      </Collapse >
    </div >
  );
};

export default PriceRangeSlider;
