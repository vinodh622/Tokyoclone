#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>
#import <UserNotifications/UNUserNotificationCenter.h>

@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate, UNUserNotificationCenterDelegate,UIApplicationDelegate>

@property (nonatomic, strong) UIWindow *window;

@end
