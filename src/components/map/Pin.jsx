import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet'; // Import Leaflet for custom icons
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 78px;
  height: 78px;
  object-fit: cover;
  border-radius: 5px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

function Pin({ item }) {
  console.log('marker', item);

  // Check if the image URL is valid before setting the marker icon
  const imageUrl = item.image;

  // Set custom icon if the image is valid
  const customIcon = L.icon({
    iconUrl: imageUrl, // Use image URL as the icon
    iconSize: [42, 42], // Adjust icon size
    iconAnchor: [16, 32], // Adjust anchor point
    popupAnchor: [0, -32], // Adjust popup anchor
  });

  return (
    <Marker
      position={[item?.latitude, item?.longitude]}
      icon={customIcon} // Apply the custom icon here
    >
      <Popup>
        <Container>
          <Image
            src={item.image}
            alt=''
          />
          <TextContainer>
            <strong>{item.name}</strong>
            <span>
              location: {`${item.street},${item.city}, ${item.country}`}
            </span>
            <b> {item?.short_desc}</b>
          </TextContainer>
        </Container>
      </Popup>
    </Marker>
  );
}

export default Pin;
