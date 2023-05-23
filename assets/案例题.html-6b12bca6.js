import{_ as e,W as n,X as a,a2 as s}from"./framework-61af4b36.js";const i={},c=s(`<h2 id="dhcp" tabindex="-1"><a class="header-anchor" href="#dhcp" aria-hidden="true">#</a> DHCP</h2><ul><li>在Linux系统中，DHCP服务默认的配置文件是：<code>/etc/dhcpd.conf</code></li><li>可以通过<code>service dhcpd start</code>命令启动DHCP，通过<code>service dhcpd stop</code>停止DHCP服务</li><li><code>host fixed{option host-name fixed.hunau.net&quot;;hardware Ethernet 00:19:21:D3:3B:05;fixed-address 192.168.1.17;}</code>的意思是：为00:.......这个MAC地址分配固定的IP地址 192.168.1.17</li></ul><h2 id="自动精简配置" tabindex="-1"><a class="header-anchor" href="#自动精简配置" aria-hidden="true">#</a> 自动精简配置：</h2><p>可以为客户虚拟出比实际物理存储更大的虚拟存储空间，为用户提供存储超分配的能力，只有写入数据的虚拟存储空间才会真正分配到物理存储，未写入的不分配，可以帮助用户降低存储的初始投资成本。</p><p>缺点：最大的问题就是可能出现实际存储空间不足的情况，所以配置监控容量是十分重要的。</p><h2 id="防火墙" tabindex="-1"><a class="header-anchor" href="#防火墙" aria-hidden="true">#</a> 防火墙：</h2><p>透明模式：透明模式的防火墙就像是一台网桥，非透明的就像是一台路由器，网络设备和所有计算机的设置不改变，防火墙必须是没有IP的，用户也不知道防火墙的IP，同时解析所有通过的数据包，增加了网络安全性，又降低了用户管理的复杂程度。</p><p><code>detect</code>命令的功能是：网络冗余，既增加了网络安全性，又降低了用户管理的复杂程度。</p><h2 id="ac与ap" tabindex="-1"><a class="header-anchor" href="#ac与ap" aria-hidden="true">#</a> AC与AP</h2><p>AC不能控制AP的原因可能有：<code>AP与AC连接断开、AP断电、AC与AP版本不匹配</code></p><h2 id="交换机与服务器接口速率不匹配" tabindex="-1"><a class="header-anchor" href="#交换机与服务器接口速率不匹配" aria-hidden="true">#</a> 交换机与服务器接口速率不匹配</h2><p>原因包括：<code>网络适配器故障、网线故障</code></p><p>解决方法：<code>检查传输介质、更换网络适配器 </code></p><h2 id="raid2-0" tabindex="-1"><a class="header-anchor" href="#raid2-0" aria-hidden="true">#</a> RAID2.0</h2><p>RAID2.0 对RAID 1.0 的改进：<code>RAID2.0 能够显著减少重构时间，避免数据重构时对一块硬盘的高强度读写，降低硬盘故障率</code></p><p>RAID2.0的优势：</p><ul><li>自动均衡负载。降低整体故障率</li><li>快速精简重构。降低数据丢失风险</li><li>故障自检自愈。保证系统可靠性</li><li>虚拟池化设计。降低管理难度</li></ul><h2 id="dns" tabindex="-1"><a class="header-anchor" href="#dns" aria-hidden="true">#</a> DNS</h2><p>在Internet中，当客户端向DNS服务器发出解析请求后，没有得到解析结果，则可以<code>使用NETBIOS名字解析</code></p><p>在命令行窗口中使用<code>ipconfig/displaydns</code>查看当前DNS缓存。使用<code>ipconfig/flushdns</code>刷新DNS解析器缓存</p><p>当访问Web服务器延时过大，为改善用户体验，可以采用：<code>添加一台Web服务器</code></p><h2 id="ipsec" tabindex="-1"><a class="header-anchor" href="#ipsec" aria-hidden="true">#</a> IPSec</h2><ul><li>两台计算机通过IPSec协议通信之前必须先进行协商，协商结果为SA。IKE协议将协商工作分为两个阶段，第一阶段协商<code>主模式</code>SA，新建一个安全的、经过身份验证的通信管道，之后第二阶段协商<code>快速模式SA</code>，便可以通过这个安全的信道来通信。</li><li>使用<code>display ike sa</code>查看协商结果</li><li>在WindowsServer2008的R2网关上配置IPSec策略，包括<code>IPSec策略、创建筛选器列表、配置隧道规则以及进行策略指派</code>4个步骤</li></ul><h2 id="ip6" tabindex="-1"><a class="header-anchor" href="#ip6" aria-hidden="true">#</a> IP6</h2><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>&lt;Huawei&gt; （1）system-view
<span class="token namespace">[Huawei]</span> sysname （2）RouterA
<span class="token namespace">[RouterA]</span>（3）ipv6  <span class="token operator">/</span><span class="token operator">/</span>开启IPv6报文转发功能
<span class="token namespace">[RouterA]</span> interface s0
<span class="token namespace">[RouterA-s0]</span> ip address 12<span class="token punctuation">.</span>1<span class="token punctuation">.</span>1<span class="token punctuation">.</span>1（4）255<span class="token punctuation">.</span>255<span class="token punctuation">.</span>255<span class="token punctuation">.</span>0
<span class="token namespace">[RouterA-s0]</span> quit
<span class="token namespace">[RouterA]</span> interface gigabitethernet 0/0/1
<span class="token namespace">[RouterA-GigabitEthernet0/0/1 ]</span> （5）ipv6 address 2002:: 1/64
<span class="token namespace">[RouterA-GigabitEthernet0/0/1 ]</span> quit


<span class="token namespace">[RouterA]</span> interface tunnel 0/0/1 <span class="token operator">/</span><span class="token operator">/</span> （6）创建Tunnel接口
<span class="token operator">/</span><span class="token operator">/</span>指定 Tunnel 为自动隧道模式
<span class="token namespace">[RouterA-Tunnel0/0/1 ]</span> （7）tunnel-protocol ipv6-ipv4 （8）auto-tunnel
<span class="token namespace">[RouterA-Tunnel0/0/1 ]</span> ipv6 （9）enable
<span class="token namespace">[RouterA-Tunnel0/0/1 ]</span> ipv6 address ::12<span class="token punctuation">.</span>1<span class="token punctuation">.</span>1<span class="token punctuation">.</span>1/96 <span class="token operator">/</span><span class="token operator">/</span> （10）设置Tunnel接口的IPv6地址
<span class="token namespace">[RouterA-Tunnel0/0/1 ]</span> source s0 <span class="token operator">/</span><span class="token operator">/</span>（11）指定Tunnel的源接口
<span class="token namespace">[RouterA-Tunnel0/0/1 ]</span> quit
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>IPv4兼容IPv6地址要求IPv4地址为公网地址。</li></ul><h2 id="_2020下" tabindex="-1"><a class="header-anchor" href="#_2020下" aria-hidden="true">#</a> 2020下</h2><ul><li>终端上ping127.0.0.1不通，故障可能是<code>TCP/IP配置错误</code>。能访问聊天软件，但是不能打开网页，可能是<code>DNS配置错误</code></li><li>存储区域SAN可以分为：<code>IP-SAN 和 FC-SAN</code>。从部署成本和传输效率比较这两种，FCSAN部署成本高，但是传输速率更高</li></ul><h2 id="防火墙-1" tabindex="-1"><a class="header-anchor" href="#防火墙-1" aria-hidden="true">#</a> 防火墙</h2><p>防火墙划分安全域：与外部互联网连接的区域叫做：<code>(非信任区域)untrust</code>。</p><p>与内部连接的区域叫做：<code>(信任区域)trust</code></p><p>与服务器连接的叫做<code>DMZ区域</code></p><h2 id="vrrp" tabindex="-1"><a class="header-anchor" href="#vrrp" aria-hidden="true">#</a> VRRP</h2><p>VRRP的功能是：<code>冗余网关</code></p><p>如果SwitchA与SwitchB之间有一条虚线，叫做：<code>心跳线</code></p><p>作用是：<code>传递VRRP报文</code></p><h2 id="_2021上" tabindex="-1"><a class="header-anchor" href="#_2021上" aria-hidden="true">#</a> 2021上</h2><ul><li><p>网络管理员使用<code>光功率计</code>设备对光缆进行检查，发现光衰非常大，初步判断是光缆故障。</p></li><li><p>使用<code>光时域反射计</code>设备判断出光缆的故障位置</p></li><li><p>采用<code>光纤熔接机</code>熔接断裂的光缆</p></li><li><p>要求坏<code>2</code>块磁盘而不丢失数据，应采用<code>RAID6</code>磁盘冗余阵列</p></li><li><p>异地备份使用互联网传输数据，应采用<code>两端搭建VPN隧道进行传输</code>措施保障数据传输安全</p></li><li><p>在有限互联网带宽下，应采用<code>增量备份</code>提高异地备份速度</p></li><li><p>完整的PoE系统由供电端设备(PSE, Power Sourcing Equipment))和受电端设备(PD. Powered Devic)两部分组成。依据IEEE 802.3af/at标准，有两种供电方式，使用<code>空闲</code>脚供电和使用<code>数据</code>脚供电，当使用空闲脚供电时，双绞线的<code>4、5</code>线对为正极、<code>7、8</code>线对为负极为PD设备供电。</p></li><li><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token namespace">[SW1]</span> poe power-management <span class="token punctuation">(</span>8<span class="token punctuation">)</span>auto

<span class="token namespace">[SW 1]</span> interface gigabitethernet 0/0/1

<span class="token namespace">[SW1-GigabitEthernet0/0/1]</span>poe power <span class="token punctuation">(</span>9<span class="token punctuation">)</span> 5000

<span class="token namespace">[SW1-GigabitEthernet0/0/1]</span>poe priority <span class="token punctuation">(</span>10<span class="token punctuation">)</span>high

<span class="token namespace">[SW1-GigabitEthernet0/0/1]</span>quit

<span class="token namespace">[SW1]</span>interface gigabitethernet 0/0/2

<span class="token namespace">[SW1-GigabitEthernet0/0/2]</span>poe power <span class="token punctuation">(</span>11<span class="token punctuation">)</span> 15000

<span class="token namespace">[SW1-GigabitEthernet0/0/2]</span>poe priority <span class="token punctuation">(</span>12<span class="token punctuation">)</span> critical

<span class="token namespace">[SW1-GigabitEthernet0/0/2]</span>quit

<span class="token namespace">[SW1]</span>interface <span class="token punctuation">(</span>13<span class="token punctuation">)</span>

<span class="token namespace">[SW1-GigabitEthernet0/0/3]</span> poe power 5000

<span class="token namespace">[SW1-GigabitEthernet0/0/3]</span>quit

<span class="token namespace">[SW1]</span> <span class="token punctuation">(</span>14<span class="token punctuation">)</span>time-range tset 2:00 to 6:00 daily

<span class="token namespace">[SW1]</span> interface gigabitethernet 0/0/4

<span class="token namespace">[SW1-GigabitEthernet0/0/4]</span> por <span class="token punctuation">(</span>15<span class="token punctuation">)</span>power-off time-range tset

Warning: This operation will power off the PD during this time range poe<span class="token punctuation">.</span> <span class="token keyword">Continue</span>?<span class="token namespace">[Y/N]</span>:y

<span class="token namespace">[SW1-GigabitEthernet0/0/4]</span>quit
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li></li></ul><h2 id="ac" tabindex="-1"><a class="header-anchor" href="#ac" aria-hidden="true">#</a> AC</h2><ul><li>相较于旁挂式AC，将AC直连部署存在的问题是：<code>对AC的吞吐量和数据处理能力要求比较高，AC容易成为整个无限网络带宽的瓶颈</code></li><li>将AC部署在接入层的问题是：<code>导致吞吐量下降</code></li></ul>`,40),p=[c];function d(t,l){return n(),a("div",null,p)}const r=e(i,[["render",d],["__file","案例题.html.vue"]]);export{r as default};
