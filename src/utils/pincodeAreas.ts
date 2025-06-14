export const mockAreas: { [key: string]: string } = {
  // Delhi NCR
  '110001': 'Connaught Place, New Delhi',
  '110002': 'Darya Ganj, New Delhi',
  '110003': 'Civil Lines, New Delhi',
  '110016': 'Lajpat Nagar, New Delhi',
  '110017': 'Saket, New Delhi',
  '110019': 'Kalkaji, New Delhi',
  '110025': 'Karol Bagh, New Delhi',
  '110048': 'Vasant Kunj, New Delhi',
  '110062': 'Dwarka, New Delhi',
  '201301': 'Noida Sector 37, Noida',
  '122001': 'Gurgaon City, Gurgaon',
  
  // Mumbai
  '400001': 'Fort, Mumbai',
  '400002': 'Kalbadevi, Mumbai',
  '400007': 'Grant Road, Mumbai',
  '400012': 'Prabhadevi, Mumbai',
  '400016': 'Mahim, Mumbai',
  '400018': 'Worli, Mumbai',
  '400025': 'Prabhadevi, Mumbai',
  '400050': 'Bandra West, Mumbai',
  '400051': 'Bandra East, Mumbai',
  '400070': 'Andheri West, Mumbai',
  
  // Bangalore
  '560001': 'Bangalore City, Bangalore',
  '560002': 'Bangalore Cantonment, Bangalore',
  '560003': 'Malleswaram, Bangalore',
  '560004': 'Rajajinagar, Bangalore',
  '560005': 'Seshadripuram, Bangalore',
  '560008': 'Sadashivanagar, Bangalore',
  '560034': 'Jayanagar, Bangalore',
  '560038': 'Jayanagar 8th Block, Bangalore',
  '560095': 'Bommanahalli, Bangalore',
  
  // Chennai
  '600001': 'George Town, Chennai',
  '600002': 'Sowcarpet, Chennai',
  '600003': 'Chintadripet, Chennai',
  '600004': 'Mylapore, Chennai',
  '600006': 'Chepauk, Chennai',
  '600014': 'Nungambakkam, Chennai',
  '600017': 'T. Nagar, Chennai',
  '600028': 'Alwarpet, Chennai',
  '600041': 'Adyar, Chennai',
  '600090': 'Thoraipakkam, Chennai',
  
  // Kolkata
  '700001': 'BBD Bagh, Kolkata',
  '700002': 'Howrah, Kolkata',
  '700003': 'Fairlie Place, Kolkata',
  '700012': 'Bhowanipore, Kolkata',
  '700016': 'Gariahat, Kolkata',
  '700017': 'Alipore, Kolkata',
  '700019': 'New Alipore, Kolkata',
  '700027': 'Ballygunge, Kolkata',
  '700029': 'Ballygunge, Kolkata',
  '700054': 'Lake Town, Kolkata',
  
  // Hyderabad
  '500001': 'Afzal Gunj, Hyderabad',
  '500003': 'Kachiguda, Hyderabad',
  '500004': 'Sultan Bazar, Hyderabad',
  '500016': 'Himayatnagar, Hyderabad',
  '500018': 'Begumpet, Hyderabad',
  '500034': 'Kondapur, Hyderabad',
  '500081': 'Gachibowli, Hyderabad',
  '500084': 'Cyberabad, Hyderabad',
  
  // Pune
  '411001': 'Pune Cantonment, Pune',
  '411002': 'Azad Nagar, Pune',
  '411003': 'Pune University, Pune',
  '411004': 'Deccan Gymkhana, Pune',
  '411005': 'Tilak Road, Pune',
  '411007': 'Aundh, Pune',
  '411038': 'Baner, Pune',
  '411045': 'Hinjewadi, Pune',
  
  // Other major cities
  '382418': 'Gandhinagar, Ahmedabad',
  '380001': 'Ellis Bridge, Ahmedabad',
  '590001': 'Belgaum, Karnataka',
  '590003': 'Tilakwadi, Belgaum',
  '590006': 'Camp, Belgaum',
  '590010': 'Hindwadi, Belgaum',
  '590016': 'Shahapur, Belgaum',
  '682001': 'Ernakulam, Kochi',
  '695001': 'Thiruvananthapuram, Kerala',
  '620001': 'Tiruchirappalli, Tamil Nadu',
  '641001': 'Coimbatore, Tamil Nadu'
};

export const detectAreaByPincode = async (pincode: string): Promise<string> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockAreas[pincode] || 'Area not found';
};
