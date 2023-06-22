import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import axios from 'axios';
import {Localenv} from '../../Environments/local.enum';
import FoodCard, {Hotelcardprops} from '../FoodCards';
import {Button, Container} from 'react-bootstrap';
import Navheader from '../Navbar';
import {checkoutPage} from '../../constant';
import colors from '../../assets/theme/colors.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import Spinner from '../Spinner';

export interface fooditem {
    name: string;
    costperItem: string;
    sold: boolean;
    hotelname: string;
}

interface foodResponse {
    id: string;
    food: {
        Breakfast: fooditem[];
        Lunch: fooditem[];
        Dinner: fooditem[];
    };
    hotelname: string;
}

function CheckoutPage() {
    const navigate = useNavigate();
    const {hotelname} = useParams();
    const [Timemode, setTimemode] = useState('');
    const [foods, setFoods] = useState<foodResponse>({} as foodResponse);

    useEffect(() => {
        const gettime = new Date().getHours();
        if (gettime >= 0 && gettime <= 10) {
            setTimemode('Breakfast');
        } else if (gettime >= 11 && gettime <= 17) {
            setTimemode('Lunch');
        } else if (gettime >= 18 && gettime <= 24) {
            setTimemode('Dinner');
        }
    }, []);

    const addToCart = (item: Hotelcardprops) => {
        const storedCartItems = localStorage.getItem('cartItems');
        let cartItems: Hotelcardprops[] = [];
        if (storedCartItems) {
            cartItems = JSON.parse(storedCartItems);
        }
        const existingItem = cartItems.find(
            (cartItem: fooditem) =>
                cartItem.hotelname === item.hotelname &&
                cartItem.name === item.name,
        );

        if (existingItem) {
            existingItem.quantity = item.quantity;
            existingItem.totalcost = item.totalcost;
        } else {
            cartItems.push(item);
        }

        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/${Localenv.Food}?hotelname=${hotelname?.split('/').join('')}`);
                const data = response.data[0];
                setFoods(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [hotelname]);

    const foodEntries = foods.food ? Object.entries(foods.food) : [];

    return (
        <Container>
            <Navheader />
            <div>
                <h3
                    className='gilroy mt-5'
                    onClick={() => {
                        history.back();
                    }}>
                    <FontAwesomeIcon icon={faArrowLeft} /> {checkoutPage.back}
                </h3>
                <h1 className='gilroy mt-5'>{hotelname?.split('/')}</h1>

                <div className='flex-row-center' id='Food-content'>
                    <h1
                        className='gilroy'
                        id='content-tittle'
                        style={{color: colors.SS2}}>
                        {checkoutPage.orderYourFavouritefood} {Timemode}
                    </h1>
                </div>

                {foodEntries.length === 0 ? (
                    <div className='flex-row-center mt-5'>
                        <Spinner />
                    </div>
                ) : (
                    <div className='row'>
                        {foodEntries
                            .filter(([key]) => key === Timemode)
                            .map(([key, value]) =>
                                value.map((item: fooditem) => (
                                    <div
                                        className='col-md-4 col-12 mt-3'
                                        key={item.name + key}>
                                        <FoodCard
                                            name={item.name}
                                            costperItem={item.costperItem}
                                            quantity={0}
                                            totalcost={0}
                                            sold={!item.sold}
                                            addToCart={addToCart}
                                            hotelname={foods.hotelname}
                                        />
                                    </div>
                                )),
                            )}
                    </div>
                )}
            </div>
            <Button
                className='gilroy mt-5 padding15 mb-5'
                onClick={() => navigate('/cart')}>
                {checkoutPage.proceedtoPayent}
            </Button>
        </Container>
    );
}

export default CheckoutPage;
