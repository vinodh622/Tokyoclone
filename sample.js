import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  StatusBar,
  Modal,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  ImageBackground,
  Alert,
  ActivityIndicator,
  TouchableHighlight,
  RefreshControl,
} from 'react-native';
import {global} from '../../Styles/global';
import * as Animatable from 'react-native-animatable';
import {connect} from 'react-redux';
import ActivityLoader from '../ActivityLoader/ActivityLoader';
import {stockstatusAction} from '../../actions/stockstatusAction';
import {ProductlistAction} from '../../actions/ProductlistAction';
import {STOCK_STATUS_UPDATE} from '.././API/Api';
import {CategorylistAction} from '../../actions/CategorylistAction';
import {Category_wise_product} from '../../actions/Category_wise_productAction';

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalvisibe1: false,
      modalvisibe2: false,
      products: [],
      category: [],

      Error: false,
      loading: true,

      search: '',

      
      selectedId: 0,
      homecategory: [
        {
          id: 0,
          categoryname: 'All',
        },
      ],
      productName: '',
      productId: '',
      productAmount: '',
      productImage: '',
      setStatus: 'Select Availability Status',
      outletDropdown: false,
      setstatusId: '',
      indicatorLoader: false,
      pageRefreshing: false,
      setcategoryName: ' ',
    };
  }

  abort = new AbortController();

  listProduct = async () => {
    await this.props
      .ProductlistAction(this.props.merchentToken)

      .then(() => {
        this.setState({loading: false});

        if (this.props.productlistStatus === 'success') {
          this.setState({products: this.props.productListdata});

          this.setState({Error: false});

          //console.log("ok")
        } else if (this.props.productlistStatus === 'failure') {
          this.setState({products: []});

          this.setState({Error: true});
        }
      });
  };

  //listProduct();

  listCategory = async () => {
    await this.props
      .CategorylistAction(this.props.merchentToken)

      .then(() => {
        if (this.props.categorylistStatus === 'success') {
          // console.log("wdwdwdwwdokwd")
          this.setState({category: this.props.categorylistData});

          this.setState({Error: false});
        } else if (this.props.categorylistStatus === 'failure') {
          this.setState({category: []});

          this.setState({Error: true});
        }
      });
  };

  catProducts = async (id) => {
    await this.props
      .Category_wise_product(this.props.merchentToken, id)

      .then(() => {
        this.setState({loading: false});

        if (this.props.categorywise_Status === 'success') {
          //console.log("succ")

          this.setState({products: this.props.categorywise_Data});
          this.setState({Error: false});
        } else if (this.props.categorywise_Status === 'failure') {
          // console.log("fail")
          this.setState({products: []});

          this.setState({Error: true});
        }
      });
  };

  componentDidMount() {
    if (this.state.selectedId === 0) {
      this.listProduct();
    }

    this.listCategory();

    this.props.stockstatusAction(this.props.merchentToken);
  }






  componentWillUnmount() {
    this.abort.abort();
  }

  categoryProduct = (id) => {
    // console.log(id)
    this.setState({loading: true});

    this.setState({selectedId: id});

    if (id === 0) {
      this.listProduct();
    } else {
      this.catProducts(id);
    }
  };

  getStausdata = (image, name, id, amount, categoryName) => {
    this.setState({modalvisibe1: true});
    this.setState({
      productId: id,
      productImage: image,
      productName: name,
      productAmount: amount,
      setcategoryName: categoryName,
    });
  };

  updateStatus = () => {
    this.setState({modalvisibe1: false});

    this.setState({modalvisibe2: true});
  };

  openOutlet = () => {
    this.setState({outletDropdown: true});
  };

  setAvailability = (name, id) => {
      
    this.setState({outletDropdown: false});
    this.setState({setStatus: name});
    this.setState({setstatusId: id});

  };

  ef = () => {
    this.setState({modalvisibe2: false});
  };

  checkStatus = async () => {
    this.setState({indicatorLoader: true});
    var form = new FormData();

    form.append('api_token', this.props.merchentToken);
    form.append('productid', this.state.productId);
    form.append('status', this.state.setstatusId);

    fetch(STOCK_STATUS_UPDATE, {
      method: 'POST',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      }),
      body: form,
    })
      .then((response) => response.json())

      .then((data) => {
     //   console.log(data)

        if (data.status === 'success') {
          this.setState({indicatorLoader: false});
          this.setState({setStatus: 'Select Availability Status'});
          Alert.alert(
            '',
            data.data,
            [
              {
                text: 'OK',
                onPress: () => {
                  this.setState({modalvisibe2: false}), () => {};
                },
              },
            ],
            {cancelable: false},
          );
        }
      })

      .then(() => {
        if (this.state.selectedId === 0) {
          this.listProduct();
        } else {
          this.catProducts(this.state.selectedId);
        }
      })

      .catch((e) => console.log(e));
  };

  updateAvailability = () => {
    if (this.state.setStatus === 'Select Availability Status') {
      Alert.alert('Please select your status', '', [{text: 'OK'}], {
        cancelable: false,
      });
    } else {
      this.checkStatus();
    }
  };

  onRefresh = () => {
    this.setState({pageRefreshing: true});
    wait(1000)
      .then(() => {
        if (this.state.selectedId === 0) {
          this.listProduct();
        } else {
          this.catProducts(this.state.selectedId);
        }

        this.listCategory();
      })
      .then(() => {
        this.setState({pageRefreshing: false});
      });
  };

  render() {
    const updateSearch = this.state.products.filter((e) =>
      e.name.toLowerCase().includes(this.state.search.toLowerCase()),
    );

    //  this.listProduct()

    return (
      <View style={global.innerpageContainer}>
        <StatusBar
          backgroundColor="#EFCB38"
          barStyle="dark-content"
          networkActivityIndicatorVisible={true}
        />

        <View
          style={
            Platform.OS === 'android'
              ? global.common_header1
              : global.common_header1_IOS
          }>
          <View style={global.common_header_layer1}>
            <TouchableOpacity
              onPress={() => this.props.navigation.openDrawer()}>
              <Image source={require('../../images/HamburgerMenu.png')} />
            </TouchableOpacity>

            <Image source={require('../../images/Logo.png')} />

            <Text></Text>
          </View>

          <View style={global.common_header_layer2}>
            <View>
              <Text style={global.common_Title}>Menu</Text>
            </View>
          </View>

          <View style={global.common_header2_btn_wrapper}>
            <View style={global.searchBox}>
              <Image
                source={require('../../images/searchIcon.png')}
                style={{width: 20, height: 20}}
              />

              <TextInput
                placeholder="Search  by item  name"
                placeholderTextColor="#BCBCBC"
                style={{width: '100%', height: 40, paddingLeft: 15}}
                onChangeText={(e) => this.setState({search: e})}
              />
            </View>
          </View>
        </View>

        <View style={{paddingTop: 20, paddingHorizontal: 15}}>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            refreshControl={
              <RefreshControl onRefresh={() => this.onRefresh()} />
            }>
            {this.state.homecategory.map((e) => {
              return (
                <View key={e.id}>
                  <TouchableOpacity onPress={() => this.categoryProduct(e.id)}>
                    <View
                      style={
                        e.id === this.state.selectedId
                          ? global.listsBox_Active
                          : global.listsBox_Inactive
                      }>
                      <Text
                        style={
                          e.id === this.state.selectedId
                            ? global.active_ListText
                            : global.inactive_Liststext
                        }>
                        {e.categoryname}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}

            {this.state.category.map((e) => {
              return (
                <View key={e.id}>
                  <TouchableOpacity onPress={() => this.categoryProduct(e.id)}>
                    <View
                      style={
                        e.id === this.state.selectedId
                          ? global.listsBox_Active
                          : global.listsBox_Inactive
                      }>
                      <Text
                        style={
                          e.id === this.state.selectedId
                            ? global.active_ListText
                            : global.inactive_Liststext
                        }>
                        {e.categoryname}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 15,
            paddingTop: 20,
            paddingBottom: 60,
          }}
          refreshControl={
            <RefreshControl
              refreshing={this.state.pageRefreshing}
              onRefresh={() => this.onRefresh()}
            />
          }>
          <Animatable.View animation="fadeInUp">
            <View>
              {this.state.loading ? (
                <ActivityLoader />
              ) : (
                <View>
                  {this.state.Error ? (
                    <View style={global.EmptyListbox}>
                      <Text style={global.emptyBoxtext}>
                        No Products Found.
                      </Text>
                    </View>
                  ) : (
                    <View>
                      {updateSearch.length > 0 ? (
                        updateSearch.map((e) => {
                          return (
                            <View key={e.id}>
                              <View style={global.menuBox}>
                                <View style={{flex: 0.9}}>
                                  <Image
                                    source={{
                                      uri: `https://shiftlogics.com/Tokyo/${e.image}`,
                                    }}
                                    style={{
                                      width: '100%',
                                      height: '100%',
                                      borderTopLeftRadius: 5,
                                      borderBottomLeftRadius: 5,
                                    }}
                                    resizeMode="cover"
                                  />
                                </View>

                                <View style={global.menuBox_col2}>
                                  <Text
                                    style={global.productName}
                                    numberOfLines={1}
                                    ellipsizeMode="tail">
                                    {e.id < 10 ? '00' + e.id : e.id} {e.name}
                                  </Text>

                                  <Text style={global.productPrice}>
                                    RM{' '}
                                    {(Math.round(e.amount * 100) / 100).toFixed(
                                      2,
                                    )}
                                  </Text>

                                  <Text
                                    style={global.producType}
                                    numberOfLines={1}
                                    ellipsizeMode="tail">
                                    {e.catename}
                                  </Text>
                                </View>

                                <View style={global.menuBox_col3}>
                                  <TouchableOpacity
                                    onPress={() =>
                                      this.getStausdata(
                                        e.image,
                                        e.name,
                                        e.id,
                                        e.amount,
                                        e.catename,
                                      )
                                    }>
                                    <View style={global.pr_Editbtn}>
                                      <Text style={global.pr_statusText}>
                                        Edit Status
                                      </Text>
                                    </View>
                                  </TouchableOpacity>

                                  <Text style={global.productStatus}>
                                    {e.stock_status}
                                  </Text>
                                </View>
                              </View>
                            </View>
                          );
                        })
                      ) : (
                        <View style={global.EmptyListbox}>
                          <Text style={global.emptyBoxtext}>
                            No Products Found.
                          </Text>
                        </View>
                      )}
                    </View>
                  )}
                </View>
              )}
            </View>
          </Animatable.View>
        </ScrollView>

        <View
          style={
            Platform.OS === 'ios'
              ? global.CustomTabheader_IOS
              : global.CustomTabheader
          }>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Lastactivity')}>
            <View style={global.tabbarMenuwidth}>
              <Image
                source={require('../../images/Hometab.png')}
                style={{width: 17, height: 17}}
              />
              <Text style={global.MenuName}>Home</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Table')}>
            <View style={global.tabbarMenuwidth}>
              <Image
                source={require('../../images/tableicon.png')}
                style={{width: 17, height: 17}}
              />
              <Text style={global.MenuName}>Table</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Actionsheet')}>
            <View style={global.tabbarMenuwidth}>
              <View style={global.circleMenu_layer1}>
                <View style={global.circleMenu_layer2}>
                  <Image
                    source={require('../../images/Iconly-Bold-Scan.png')}
                  />
                </View>
              </View>
              <Text style={global.Menu_Center}>Transaction</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Reservation')}>
            <View style={global.tabbarMenuwidth}>
              <Image
                source={require('../../images/calendar.png')}
                style={{width: 19, height: 19}}
              />
              <Text style={global.MenuName}>Reservation</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Summary')}>
            <View style={global.tabbarMenuwidth}>
              <Image
                source={require('../../images/logout.png')}
                style={{width: 17, height: 17}}
              />
              <Text style={global.MenuName}>Day End</Text>
            </View>
          </TouchableOpacity>
        </View>

        <Modal
          animationType="none"
          transparent={true}
          visible={this.state.modalvisibe1}>
          <TouchableOpacity
            style={global.popupBg1}
            onPress={() => this.setState({modalvisibe1: false})}>
            <View>
              <View style={global.popupBox1}>
                <Text style={global.popup_Title1}>Update Menu Status?</Text>
                <Text style={global.popup_Title2}>
                  Would you like to change this menu status ?
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingTop: 40,
                  }}>
                  <TouchableOpacity
                    onPress={() => this.setState({modalvisibe1: false})}>
                    <View style={global.confirm_btncancel}>
                      <Text style={global.white_Btn_Text}>No</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.updateStatus()}>
                    <View style={global.confirm_proceed}>
                      <Text style={global.whiteText}>Yes</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>

        <Modal
          animationType="none"
          transparent={true}
          visible={this.state.modalvisibe2}>
          <View style={global.innerpageContainer}>
            <View style={global.productImagebanner}>
         


<ImageBackground
                source={{
                  uri: `https://shiftlogics.com/Tokyo/${this.state.productImage}`,
                }}
                resizeMode="cover"
                style={{width: '100%', height: '100%'}}>
                <View
                  style={
                    Platform.OS == 'android'
                      ? global.pr_detailhead
                      : global.pr_detailheadIOS
                  }>
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({modalvisibe2: false}, () => {
                        this.setState({
                          setStatus: 'Select Availability Status',
                        });
                      })
                    }>
                    <Image
                      source={require('../../images/yellowBackarrow.png')}
                    />
                  </TouchableOpacity>
                </View>
              </ImageBackground>

       
              
              
  

              
            </View>

            <View style={global.common_wrapper}>
              <Text style={global.common_Title}>
                {this.state.productId < 10
                  ? '00' + this.state.productId
                  : this.state.productId}{' '}
                {this.state.productName}
              </Text>
            </View>
            <ScrollView
              contentContainerStyle={{paddingHorizontal: 15}}
              keyboardShouldPersistTaps={'handled'}>
              <View style={global.productDetail_Box}>
                <Text style={global.productAmount}>
                  MYR{' '}
                  {(Math.round(this.state.productAmount * 100) / 100).toFixed(
                    2,
                  )}{' '}
                </Text>

                <View style={global.Transaction_lists}>
                  <Text style={global.tr_list_label}>Product ID:</Text>
                  <Text style={global.tr_list_value}>
                    {this.state.productId < 10
                      ? '00' + this.state.productId
                      : this.state.productId}
                  </Text>
                </View>

                <View style={global.Transaction_lists}>
                  <Text style={global.tr_list_label}>Product Category:</Text>
                  <Text style={global.tr_list_value}>
                    {this.state.setcategoryName}
                  </Text>
                </View>

                <View style={global.Transaction_lists}>
                  <Text style={global.tr_list_label}>Product Status:</Text>

                  <TouchableOpacity onPress={() => this.openOutlet()}>
                    <View style={global.selecter_Box}>
                      <Text style={global.normalText}>
                        {this.state.setStatus}
                      </Text>
                      <Image
                        source={require('../../images/down-arrow.png')}
                        style={global.downArrow}
                      />
                    </View>
                  </TouchableOpacity>

                  {this.state.outletDropdown ? (
                    <View style={global.selecter_Dropdown}>
                      {this.props.stockStatus.map((e) => {
                        return (
                          <View key={e.id}>
                            <TouchableHighlight
                              onPress={() =>
                                this.setAvailability(e.name_status, e.id)
                              }
                              underlayColor={'#FFF5CE'}
                              style={global.selecter_Dropdowntypes}>
                              <Text style={global.normalText}>
                                {e.name_status}
                              </Text>
                            </TouchableHighlight>
                          </View>
                        );
                      })}
                    </View>
                  ) : (
                    <View></View>
                  )}
                </View>
              </View>

              <View style={global.Btn_ctx}>
                <TouchableOpacity onPress={() => this.updateAvailability()}>
                  <View style={global.md_Button}>
                    <Text style={global.whiteText}>Update</Text>

                    {this.state.indicatorLoader ? (
                      <ActivityIndicator
                        size="small"
                        color="#F1D049"
                        style={{marginLeft: 10}}
                      />
                    ) : (
                      <View></View>
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  merchentToken: state.loginDetails.token,

  stockStatus: state.stocklistReducer.stockStatus,

  productlistStatus: state.ProductlistReducer.productlistStatus,

  productListdata: state.ProductlistReducer.productListdata,

  categorylistStatus: state.CategorylistReducer.categorylistStatus,

  categorylistData: state.CategorylistReducer.categorylistData,

  categorywise_Data: state.Category_wise_productReducer.categorywise_Data,
  categorywise_Status: state.Category_wise_productReducer.categorywise_Status,
});
export default connect(mapStateToProps, {
  stockstatusAction,

  ProductlistAction,
  CategorylistAction,
  Category_wise_product,
})(Menu);