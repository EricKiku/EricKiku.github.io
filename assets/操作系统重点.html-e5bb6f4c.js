import{_ as t,W as d,X as p,a2 as i}from"./framework-61af4b36.js";const l="/assets/images/image-20230220100725219.png",a="/assets/images/image-20230224102903270.png",e="/assets/images/image-20230223110737064.png",h="/assets/images/czxtFIFO.png",r={},o=i('<h1 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a> &quot;&quot;</h1><p>1.OS作为用户与计算机硬件系统之间的接口</p><p>2.OS作为计算机系统资源的管理者</p><p>3.多道程序设计的基本概念</p><ul><li>为了进一步提高资源的利用率和系统吞吐量</li></ul><p>4.分时系统实现中的关键问题之及时处理</p><ul><li>采用轮转运行方式</li></ul><p>5.实时信息处理系统有</p><ul><li>飞机或火车的订票系统</li></ul><p>6.OS的作用可表现在哪几个方面</p><ul><li>硬件系统和用户之间的接口。</li><li>计算机系统资源的管理者（CPU、存储器、IO、文件）</li><li>实现了对计算资源的抽象</li></ul><p>7.由程序段、相关的数据段、PCB 三部分构成了进程实体</p><p>8.进程的三种基本状态的转换</p><figure><img src="'+l+'" alt="image-20230220100725219" tabindex="0" loading="lazy"><figcaption>image-20230220100725219</figcaption></figure><p>9.进程控制一般是由OS的内核中的原语来实现的</p><p>10.为了完成任务而建立了两个或多个进程，这些进程将为完成同一项任务而相互合作</p><p>11.每个进程中访问临界区资源的那段代码叫做临界区。</p><p>12.P58和P59</p><figure><img src="'+a+'" alt="image-20230224102903270" tabindex="0" loading="lazy"><figcaption>image-20230224102903270</figcaption></figure><p>13.P61。mutex为互斥信号量，取值范围为(-1,0,1)，当mutex=1时，表示两个进程皆未进入需要互斥的临界区。当mutex为0时，表示有一个进程进入临界区运行，另一个需等待，挂入阻塞队列。当mutex为-1时，表示有一个进程在临界区运行，另一个进程因等待而阻塞在信号量队列中，需要被当前已在临界区运行的进程退出时唤醒。</p><p>14.线程，是调度和分派的基本单位</p><p>15.为什么要引入挂起状态。进程的几种基本状态。</p><ul><li><p>终端用户需要，父进程需要，操作系统需要，对换需要和负荷调节需要。</p></li><li><p>状态：就绪，执行，阻塞</p></li></ul><p>16.P94.周转时间和带权周转时间</p><p>17.P98 的公式。</p><p>18.引起死锁的原因：</p><ul><li>竞争不可抢占性资源引起死锁</li><li>竞争可消耗资源引起死锁</li><li>进程推进顺序不当引起死锁</li></ul><p>19.处理死锁的方法</p><ul><li>预防死锁</li><li>避免死锁</li><li>检测死锁</li><li>解除死锁</li></ul><p>20.破坏“循环等待”条件是 预防死锁</p><p>21.银行家算法 是 避免死锁</p><p>22.P122 大题</p><p>23.P139 内存回收问题</p><figure><img src="'+e+'" alt="image-20230223110737064" tabindex="0" loading="lazy"><figcaption>image-20230223110737064</figcaption></figure><p>A：回收区前有空闲区，应将回收区和前一空闲区合并，只修改F1的大小，不需要修改地址</p><p>B：也是合并，使用回收区的首地址作为新的空闲区的首地址</p><p>C：合并三者，使用F1的表项和F1的首地址，取消F2的表项，大小为三者之和</p><p>24.首次适应算法(FF)、最佳适应算法(NF)、最坏适应算法(WF)</p><p>FF：找到第一个适合的空闲分区</p><p>NF：找到第一个最小最合适的空闲分区</p><p>WF：找到最大的空闲分区</p><p>25.页的大小固定且由系统决定、而分段是用户的行为</p><p>26.段页式存储 需要三次访问内存</p><p>27.虚拟内存工作原理</p><ul><li>部分装入：在程序装入时，不必将其全部读入到内存，而只需将当前需要执行的部分页或者段读入到内存，就可以让程序开始执行。</li><li>动态调入：程序执行过程中，如果需执行的指令未在内存中，则由处理器通知操作系统将相应的页或段调入到内存</li><li>页面置换：操作系统将内存中暂时不用的页或段调出保存在外存，从而省出空间存放准备调入的页或段</li></ul><p>28.每当程序所要访问的页面未在内存时，便向CPU发出 缺页中断</p><p>缺页率算法为 f=F/A</p><p>29.不适当的算法或如此频繁地更换页面可能会导致进程发生“抖动”</p><p>30.Belady现象：当分配到的内存块数增加时，缺页中断的次数可能增加。只有FIFO算法会出现该现象</p><p>31.[LRU 置换算法 大题 P176]</p><ul><li>只能利用“最近的过去”作为“最近的将来”的近似，选择最近最久未使用的页面予以淘汰</li><li>以“最近的过去”作为“不久的将来”的近似，选择最近一段时间内最久没有使用的页面淘汰。 它的实质是：当需要更新一页时，选择在最近一段时间内最久没有被使用的页面予以淘汰</li><li><code>技巧：</code>在内存中没有的页面开始往前看，置换“最前面的“，但不是从一开始的，那样这个算法就没有意义了</li></ul><p>例题： 在一个请求分页系统中，分别采用 [FIFO、LRU和 OPT页面置换算法时，假如一个作业的页面走向为 4、3、2、1、4、3、5、4、3、2、1、5，当分配给该作业的物理块数M分别为 3、4时，试计算在访问过程中所发生的缺页次数和缺页率，并比较所得结果。</p><p>LRU:</p><table><thead><tr><th>页面</th><th>4</th><th>3</th><th>2</th><th>1</th><th>4</th><th>3</th><th>5</th><th>4</th><th>3</th><th>2</th><th>1</th><th>5</th></tr></thead><tbody><tr><td>块1</td><td>4</td><td>4</td><td>4</td><td>1</td><td>1</td><td>1</td><td>5</td><td></td><td></td><td>2</td><td>2</td><td>2</td></tr><tr><td>块2</td><td></td><td>3</td><td>3</td><td>3</td><td>4</td><td>4</td><td>4</td><td></td><td></td><td>4</td><td>1</td><td>1</td></tr><tr><td>块3</td><td></td><td></td><td>2</td><td>2</td><td>2</td><td>3</td><td>3</td><td></td><td></td><td>3</td><td>3</td><td>5</td></tr></tbody></table><p>LRU：共发生 10次缺页中断 缺页率=10/12=83.3%</p><table><thead><tr><th>页面</th><th>4</th><th>3</th><th>2</th><th>1</th><th>4</th><th>3</th><th>5</th><th>4</th><th>3</th><th>2</th><th>1</th><th>5</th></tr></thead><tbody><tr><td>块1</td><td>4</td><td>4</td><td>4</td><td>4</td><td></td><td></td><td>4</td><td></td><td></td><td>4</td><td>4</td><td>5</td></tr><tr><td>块2</td><td></td><td>3</td><td>3</td><td>3</td><td></td><td></td><td>3</td><td></td><td></td><td>3</td><td>3</td><td>3</td></tr><tr><td>块3</td><td></td><td></td><td>2</td><td>2</td><td></td><td></td><td>5</td><td></td><td></td><td>5</td><td>1</td><td>1</td></tr><tr><td>块4</td><td></td><td></td><td></td><td>1</td><td></td><td></td><td>1</td><td></td><td></td><td>2</td><td>2</td><td>2</td></tr></tbody></table><p>LRU：共发生 8次缺页中断 缺页率=8/12=66.7%</p><p>31.[P189，习题13] 在一个请求分页系统中，采用FIFO页面置换算法时，假如一个作业的页面走向为 4、3、2、1、4、3、5、4、3、2、1、5，当分配给该作业的物理块数M分别为3和4时，计算在访问过程中所发生的缺页次数和缺页率，并比较结果。</p><ul><li><p>先进先出（FIFO）更新算法： 也称为最早出现的页面更新算法。该算法总是淘汰最先进入内存的页面，即选择在内存中停留时间最长的一页予以淘汰。如果同时有多个页面符合淘汰的条件，则任意选择一个予以淘汰即可。</p></li><li><p><code>技巧：</code>谁先连成和题目所给物理块总数，谁先被置换掉</p></li><li><p><strong>缺页率=缺页次数/总页数</strong></p></li><li><p><strong>置换率=置换次数/总页数</strong></p><p><strong>置换次数=缺页次数-物理块数</strong></p></li></ul><figure><img src="'+h+'" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>M=3时，采用FIFO页面置换算法的缺页次数为9次，缺页率为75%；M=4时，采用FIFO页面置换算法的缺页次数为10次，缺页率为83%。</p><p>由此可见，增加分配给作业的内存块数，反而增加了缺页次数，提高了缺页率，这种现象被称为是Belady现象。</p><p>32.I/O系统的层次结构？</p><ul><li>用户层软件</li><li>设备独立性软件</li><li>设备驱动程序</li><li>中断处理程序</li><li>硬件</li></ul><p>33.[判断题]仅在传送一个或多个数据块的开始和结束时，才需CPU干预</p><p>34.设备为每一个设备都配置了一张设备控制表</p><p>35.逻辑设备表的作用是，用于将逻辑设备名映射为物理设备名</p><p>36.当CPU需要输入设备时，直接从输入井读入内存。输出进程也称为缓输出进程，用于模拟脱机输出时的外围控制机，把用户要求输入的数据从内存传送并存放到输入井，待输出设备空闲时，再将输出井中的数据经过输出缓冲区输出至输出设备上。</p><p>37.引入缓冲区的原因：</p><ul><li>缓和CPU和I/O设备间速度不匹配的矛盾</li><li>减少对CPU的中断频率</li><li>解决数据粒度不匹配的问题</li><li>提高CPU和I/O设备之间的并行性</li></ul><p>38.P225 数据的处理时间表示为:Max(C,T)+M、Max(M+C,T)</p><p>39.P233 早期的磁盘调度算法：FCFS 先来先服务 SSTF最短寻道时间优先</p><p>40.P234 SCAN扫描算法 计算题</p><p>41.设备管理有哪些主要功能，主要任务是什么。</p><ul><li>主要功能有缓冲管理、 设备分配和设备处理以及虚拟设备等功能。 主要任务： a. 完成用户进程提出的 I/O 请求， 为用户进程分配所需的 I/O 设备， 并完成指定的 I/O 操作。 b.提高 CPU 和 I/O 设备的利用率， 没提高 I/O 速度， 方便用户使用 I/O 设备。</li></ul><p>42.记录 是文件存取的基本单位。文件在文件系统中是一个最大的数据单位</p><p>43.文件按照逻辑结构分，分为1.有结构文件，又称记录式文件。2.无结构文件，又称流式文件</p><p>44.按文件的组织方式分类：顺序文件、索引文件、索引顺序文件</p><p>45.在不同的用户目录中，可以使用相同的文件名</p>',79),s=[o];function g(n,u){return d(),p("div",null,s)}const m=t(r,[["render",g],["__file","操作系统重点.html.vue"]]);export{m as default};
