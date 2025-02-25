### flutter总结

首先要下好对应的flutter sdk,并把环境变量改一下，android文件夹下的local.properties文件夹加上相应的flutter sdk

有必要在android studio的设置找到languages & frameworks选项下的flutter选项，选择对应的flutter sdk路径。

还有问题升级 gradle版本，在gradle-wrapper.properties文件以及build.gradle文件。改完记得点击sync project  with gradle files



不是老版本项目只需要加一下flutter sdk 在local.properties文件加（但也不绝对）

更新问题	https://blog.csdn.net/qq_42402086/article/details/132624938

settings.gradle的插件有可能要更新，更新完之后就不会报错了



[json序列化矛盾](javascript:;)

```
flutter clean

flutter pub get

flutter packages pub run build_runner build --delete-conflicting-outputs  
```

### Hero组件问题

当hero包裹的组件有TextField会有问题，需要包裹**Material组件**。TextField设置自动聚焦会抽搐（先关闭键又弹出键盘）解决：设置一个变量，先不聚焦，等页面构建完再聚焦

## mumu模拟器运行项目
配置地址到环境变量path:D:\Program Files\Netease\MuMu Player 12\shell
adb connect 127.0.0.1:16384  连接模拟器 端口看具体的模拟器

## NestedScrollView

使用ExtendedNestedScrollView代替，原生的有些许问题

### 发送formdata 

`FormData`是一个用于在HTTP请求中传递表单数据的对象。它被广泛使用于发送POST请求时，以键值对的形式传递表单数据。

在Dart中，你可以使用`http`或`dio`等网络请求库来创建`FormData`对象，并将表单数据添加到其中。例如，创建一个`FormData`对象并添加表单数据的示例代码如下：

```dart
import 'package:dio/dio.dart';

FormData formData = FormData();

formData.fields.addAll([
  MapEntry('name', 'John Doe'),
  MapEntry('email', 'johndoe@example.com'),
  MapEntry('age', '25'),
]);

// 或者可以使用内置的方法添加字段
formData.fields.add(MapEntry('password', 'mypassword'));

// 可以添加文件字段
formData.files.add(MapEntry('file', await MultipartFile.fromFile(path)));

// 可以添加多个文件字段
List<File> files = [File('path1'), File('path2')];
for (var file in files) {
  formData.files.add(MapEntry('files', await MultipartFile.fromFile(file.path)));
}
```

上述示例代码中，我们首先创建了一个`FormData`对象，并使用`fields`属性添加了一系列键值对。可以使用`MapEntry`来将键和值组成一个键值对，并使用`fields.add`方法将其添加到`FormData`对象中。

另外，如果需要上传文件，也可以使用`files`属性来添加文件字段。可以使用`MultipartFile.fromFile`方法将文件路径转换为`MultipartFile`对象，然后将其添加到`FormData`对象的`files`属性中。

在实际发送请求时，`FormData`对象可以作为请求的`data`参数或作为body的一部分进行传递，具体使用方法请参考网络请求库的文档。

### stream流响应

如果你将`responseType`设置为`stream`，则可以通过监听流来获取数据，并将数据拼接成字节数组。

下面是一个示例代码：

```dart
import 'dart:async';
import 'dart:typed_data';
import 'package:dio/dio.dart';

Future<Uint8List> fetchImageData() async {
  Dio dio = Dio();
  
  // 设置responseType为stream
  dio.options.responseType = ResponseType.stream;
  
  // 发起请求
  Response response = await dio.get('https://example.com/image.jpg');
  
  // 将流转换为字节数组
  List<int> bytes = [];
  await for (var chunk in response.data.stream) {
    bytes.addAll(chunk);
  }
  
  return Uint8List.fromList(bytes);
}

void main() async {
  Uint8List imageBytes = await fetchImageData();
  
  // 可以使用imageBytes进行相关操作，比如保存到文件，显示图片等
}
```

使用`response.data.stream`，你可以通过`await for`循环获取流的每个chunk，并将其添加到一个字节数组中。最后，使用`Uint8List.fromList`将字节数组转换为`Uint8List`类型。这样就可以通过`imageBytes`进行后续操作，比如保存到文件或显示图片。



### 包

评论弹窗 sliding_up_panel

