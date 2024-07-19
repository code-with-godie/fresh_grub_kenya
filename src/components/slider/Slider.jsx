import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
const Container = styled.div`
  width: 100%;
  height: 30vh;
  .swiper {
    width: 100%;
    height: 100%;
  }
  @media screen and (min-width: 768px) {
    height: 50vh;
  }
`;
const SlideContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
`;
const Left = styled.div`
  flex: 1;
  position: absolute;
  bottom: 0;
  z-index: 100;
  color: var(--color-golden);
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;
const Right = styled.div`
  flex: 1;
  background: #0000008c url(${props => props.bg}) no-repeat center;
  background-size: cover;
  background-blend-mode: darken;
  @media screen and (min-width: 768px) {
    border-radius: 0.5rem;
  }
`;
const Title = styled.h2`
  text-transform: capitalize;
  @media screen and (min-width: 768px) {
    font-size: 3rem;
  }
`;
const Description = styled.p`
  @media screen and (min-width: 768px) {
    font-size: 1.5rem;
  }
`;
const ShopNow = styled.button`
  border: 1px solid var(--color-golden);
  padding: 0.5rem 1rem;
  background-color: var(--color-golden);
  outline: none;
  cursor: pointer;
  border-radius: 0.5rem;
  font-size: 1rem;
  text-transform: capitalize;
  color: white;
  @media screen and (min-width: 768px) {
    font-size: 1.5rem;
    padding: 1rem 3rem;
  }
`;
const Slider = ({ restaurant = [] }) => {
  const navigate = useNavigate();

  return (
    <Container>
      <Swiper
        className='swiper'
        spaceBetween={0}
        autoplay={{
          delay: 3000,
        }}
        slidesPerView={1}
        loop={true}
        modules={[Autoplay]}
      >
        {restaurant?.map(item => (
          <SwiperSlide key={item.$id}>
            <SlideContainer>
              <Right bg={item?.image} />
              <Left>
                <Title> {item?.name} </Title>
                <Description> {item?.short_desc} </Description>
                <ShopNow onClick={() => navigate(`/restaurant/${item?.$id}`)}>
                  {' '}
                  explore and order
                </ShopNow>
              </Left>
            </SlideContainer>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
};

export default Slider;
