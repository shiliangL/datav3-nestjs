## nestjs开发备忘

### 分层架构设计

- Controller 负责处理请求、返回响应。一个具体的Controller负责接收和处理具体的请求，由路由系统将请求分发给各Controller处理。
- Service 负责提供方法和操作，只包含业务逻辑。例如CRUD操作数据，Nest借鉴了Angular (Spring) 依赖注入模式，可以将Service注入到Controller中作为服务使用。这样Controller和Service就能完全处于解藕状态。Controller 做的事情仅仅接收请求并在合适的时候调用Service,至于 Service 内部怎么实现的 Controller 完全不在乎。
- Data Access 负责访问数据库中的数据。

### 核心概念

#### Controller

负责接收请求，返回响应。与路由系统配合，路由系统决定那个请求使用那个 controller，期间可以调用 service。

``````JS
//JavaScript

@Controller('cats')
export class CatsController {
  @Post()
  create(): string {
    return 'This action adds a new cat';
  }

  @Get('ab*cd')
  findAll(@Req() request: Request): string {
    return 'This action returns all cats';
  }
}

``````

#### Provider

Provider 是能够向别的类注入依赖的类，依赖可以是services, repositories, factories, helpers 等等。相当于提供服务的 service 层。Provider 是来自依赖注入的概念。

#### Module

Nest 采用模块化思路，将 APP 分割成各个模块，可以是专属功能的模块，也可以是通用的共享模块以及全局模块。APP 至少有一个根模块，包含定义的providers、controllers，repositories, interceptors, middleware, 等等，以及imports及exports。一个模块可以引用其他模块，也可以被其他模块引用。exports 可以导出providers(service)供其他模块使用

#### middleware

Nest 底层基于Express来处理HTTP请求，也保留了Express中间件机制，因此Nest的中间件的定位、作用以及接口和 Express 是一致的，但不同的是， Nest 注册的中间件是在路由处理程序(如 Controller)之前调用的，而对于Express，中间件即是路由处理程序。

#### Exception filters

Nest 框架内部提供一个异常处理机制，专门用来负责应用程序中未处理的异常。当错误未被捕获，就会被 Nest 的全局过滤异常器处理。这种机制跟Express差不多 。跟Express不同的是，Nest 内部提供了很多类型的错误类，用来抛出具体的错误。Nest 同样还可以自定义错误处理类：

#### pipe 管道

Nest 中的 pipe 管道是用来为路由处理函数的参数(输入数据)做转换和校验，因此在路由处理函数之前被调用，然后将处理后的数据传给路由处理函数当作参数.

#### Guards 守卫

服务端应用程序另外一个常见的功能就是认证，例如权限、角色等。Nest 内置的Guards是专门用于做这些事情的，决定请求是否会被路由处理器处理。

#### Interceptors 拦截器

### 总结

1. 自定义filters/pipe/guard/interceptor都需要实现特定的接口。
2. filters/pipe/guard/interceptor 作用域都可以是函数级别、controller级别和全局级别。
3. filters/pipe/guard/interceptor 执行顺序。
